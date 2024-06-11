use chrono::{DateTime, Utc};
use serde::de::Visitor;
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::fmt::{Display, Formatter};
use std::str::FromStr;
use std::sync::Arc;

#[derive(Clone, Debug, PartialEq)]
pub struct DependencyConstraintsParseError {
    source: String,
}

impl DependencyConstraintsParseError {
    fn new(source: &str) -> Self {
        DependencyConstraintsParseError {
            source: source.to_owned(),
        }
    }
}

impl Display for DependencyConstraintsParseError {
    fn fmt(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(
            formatter,
            "Cannot parse dependency constraint {}",
            &self.source
        )
    }
}

impl std::error::Error for DependencyConstraintsParseError {}

#[derive(Clone, Copy, Eq, PartialEq, Debug)]
pub enum DependencyConstraints {
    /// <
    LessThan,
    /// >
    MoreThan,
    /// =
    Equals,
    /// >=
    MoreOrEqualsThan,
    /// <=
    LessOrEqualsThan,
}

impl FromStr for DependencyConstraints {
    type Err = DependencyConstraintsParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s == "<" {
            Ok(DependencyConstraints::LessThan)
        } else if s == ">" {
            Ok(DependencyConstraints::MoreThan)
        } else if s == "=" {
            Ok(DependencyConstraints::Equals)
        } else if s == ">=" {
            Ok(DependencyConstraints::MoreOrEqualsThan)
        } else if s == "<=" {
            Ok(DependencyConstraints::LessOrEqualsThan)
        } else {
            Err(DependencyConstraintsParseError::new(s))
        }
    }
}

impl Display for DependencyConstraints {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.write_str(match self {
            DependencyConstraints::LessThan => "<",
            DependencyConstraints::MoreThan => ">",
            DependencyConstraints::Equals => "=",
            DependencyConstraints::MoreOrEqualsThan => ">=",
            DependencyConstraints::LessOrEqualsThan => "<=",
        })
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum DependencyVersionParseError {
    ConstraintNotFound,
    VersionNotFound,
}

impl Display for DependencyVersionParseError {
    fn fmt(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            DependencyVersionParseError::ConstraintNotFound => {
                write!(formatter, "Constraint not found")
            }
            DependencyVersionParseError::VersionNotFound => write!(formatter, "Version not found"),
        }
    }
}

impl std::error::Error for DependencyVersionParseError {}

#[derive(Clone, Eq, PartialEq, Debug)]
pub struct DependencyVersion {
    pub constraint: DependencyConstraints,
    pub version: String,
}

impl FromStr for DependencyVersion {
    type Err = DependencyVersionParseError;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        if let Some(value) = value.strip_prefix(">=") {
            if value.is_empty() {
                return Err(DependencyVersionParseError::VersionNotFound);
            }
            Ok(DependencyVersion {
                constraint: DependencyConstraints::MoreOrEqualsThan,
                version: value.to_owned(),
            })
        } else if let Some(value) = value.strip_prefix("<=") {
            if value.is_empty() {
                return Err(DependencyVersionParseError::VersionNotFound);
            }
            Ok(DependencyVersion {
                constraint: DependencyConstraints::LessOrEqualsThan,
                version: value.to_owned(),
            })
        } else if let Some(value) = value.strip_prefix('<') {
            if value.is_empty() {
                return Err(DependencyVersionParseError::VersionNotFound);
            }
            Ok(DependencyVersion {
                constraint: DependencyConstraints::LessThan,
                version: value.to_owned(),
            })
        } else if let Some(value) = value.strip_prefix('>') {
            if value.is_empty() {
                return Err(DependencyVersionParseError::VersionNotFound);
            }
            Ok(DependencyVersion {
                constraint: DependencyConstraints::MoreThan,
                version: value.to_owned(),
            })
        } else if let Some(value) = value.strip_prefix('=') {
            if value.is_empty() {
                return Err(DependencyVersionParseError::VersionNotFound);
            }
            Ok(DependencyVersion {
                constraint: DependencyConstraints::Equals,
                version: value.to_owned(),
            })
        } else {
            Err(DependencyVersionParseError::ConstraintNotFound)
        }
    }
}

impl Display for DependencyVersion {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let dep = self.constraint.to_string() + &self.version;
        f.write_str(&dep)
    }
}

#[derive(Clone, Eq, PartialEq, Debug)]
pub struct Dependency {
    /// dependency name
    pub name: String,
    /// dependency version constraint. If None - match all dependencies with given name
    pub version: Option<DependencyVersion>,
}

impl FromStr for Dependency {
    type Err = DependencyVersionParseError;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        if let Some(pos) = value
            .find('<')
            .or_else(|| value.find('>'))
            .or_else(|| value.find('='))
        {
            let version = DependencyVersion::from_str(&value[pos..])?;
            Ok(Dependency {
                name: value[..pos].to_owned(),
                version: Some(version),
            })
        } else {
            Ok(Dependency {
                name: value.to_owned(),
                version: None,
            })
        }
    }
}

impl Display for Dependency {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        if let Some(version) = self.version.as_ref() {
            f.write_str(&self.name)?;
            version.fmt(f)?;
        } else {
            f.write_str(&self.name)?;
        }
        Ok(())
    }
}

impl<'de> Deserialize<'de> for Dependency {
    fn deserialize<D>(deserializer: D) -> Result<Self, <D as Deserializer<'de>>::Error>
    where
        D: Deserializer<'de>,
    {
        use serde::de::Error;
        struct VisitorImpl;

        impl<'de> Visitor<'de> for VisitorImpl {
            type Value = Dependency;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                write!(
                    formatter,
                    "dependency name(like 'test') with or without version constraint"
                )
            }

            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: Error,
            {
                Dependency::from_str(v).map_err(|e| Error::custom(e.to_string()))
            }
        }

        deserializer.deserialize_str(VisitorImpl)
    }
}

impl Serialize for Dependency {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

/// Repository package
#[derive(Serialize, Deserialize, Clone, Eq, PartialEq, Debug)]
pub struct Package {
    /// file name
    #[serde(rename = "FILENAME")]
    pub file_name: String,
    /// name
    #[serde(rename = "NAME")]
    pub name: String,
    /// name without architecture
    #[serde(rename = "BASE")]
    pub base: Option<String>,
    /// version
    #[serde(rename = "VERSION")]
    pub version: String,
    /// description
    #[serde(rename = "DESC")]
    pub description: Option<String>,
    /// package groups
    #[serde(rename = "GROUPS")]
    pub groups: Option<Vec<String>>,
    /// tar.xz archive size
    #[serde(rename = "CSIZE")]
    pub compressed_size: Option<u64>,
    /// installed files size
    #[serde(rename = "ISIZE")]
    pub installed_size: Option<u64>,
    /// MD5 checksum
    #[serde(rename = "MD5SUM")]
    pub md5_sum: Option<String>,
    /// SHA256 checksum
    #[serde(rename = "SHA256SUM")]
    pub sha256_sum: Option<String>,
    /// PGP signature
    #[serde(rename = "PGPSIG")]
    pub pgp_signature: Option<String>,
    /// package home url
    #[serde(rename = "URL")]
    pub home_url: Option<String>,
    /// license name
    #[serde(rename = "LICENSE")]
    pub license: Option<Vec<String>>,
    /// processor architecture
    #[serde(rename = "ARCH")]
    pub architecture: String,
    /// build date
    #[serde(rename = "BUILDDATE", with = "date_serde")]
    pub build_date: DateTime<Utc>,
    /// who created this package
    #[serde(rename = "PACKAGER")]
    pub packager: String,
    /// packages which this package replaces
    #[serde(rename = "REPLACES")]
    pub replaces: Option<Vec<String>>,
    /// packages which cannot be used with this package
    #[serde(rename = "CONFLICTS")]
    pub conflicts: Option<Vec<String>>,
    /// packages provided by this package
    #[serde(rename = "PROVIDES")]
    pub provides: Option<Vec<String>>,
    /// run-time dependencies
    #[serde(rename = "DEPENDS")]
    pub depends: Option<Vec<Dependency>>,
    #[serde(rename = "OPTDEPENDS")]
    pub optdepends: Option<Vec<Dependency>>,
    /// build-time dependencies
    #[serde(rename = "MAKEDEPENDS")]
    pub makedepends: Option<Vec<Dependency>>,
    #[serde(rename = "CHECKDEPENDS")]
    pub checkdepends: Option<Vec<Dependency>>,
    /// VCS packages with same name. For example `test-git-1.0` is a VCS package for `test-1.0`.
    /// Supported prefixes are:
    /// - cvs
    /// - svn
    /// - hg
    /// - darcs
    /// - bzr
    /// - git
    #[serde(skip)]
    pub linked_sources: Vec<Arc<Package>>,
}

impl Package {
    pub fn base_package_for_csv(csv: &Package, suffix: &str) -> Self {
        Package {
            file_name: csv.file_name.clone(),
            name: csv.name.replace(suffix, ""),
            base: csv.base.clone().map(|name| name.replace(suffix, "")),
            version: csv.version.replace(suffix, ""),
            architecture: csv.architecture.clone(),
            depends: csv.depends.clone(),
            build_date: csv.build_date,
            checkdepends: csv.checkdepends.clone(),
            compressed_size: csv.compressed_size,
            conflicts: csv.conflicts.clone(),
            description: csv.description.clone(),
            groups: csv.groups.clone(),
            home_url: csv.home_url.clone(),
            installed_size: csv.installed_size,
            license: csv.license.clone(),
            linked_sources: Vec::new(),
            makedepends: csv.makedepends.clone(),
            md5_sum: csv.md5_sum.clone(),
            optdepends: csv.optdepends.clone(),
            packager: csv.packager.clone(),
            pgp_signature: csv.pgp_signature.clone(),
            provides: csv.provides.clone(),
            replaces: csv.replaces.clone(),
            sha256_sum: csv.sha256_sum.clone(),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Eq, PartialEq, Debug)]
pub struct PackageFiles {
    #[serde(rename = "FILES")]
    pub files: Vec<String>,
}

mod date_serde {
    use chrono::{DateTime, TimeZone, Utc};
    use serde::{self, Deserialize, Deserializer, Serializer};

    pub fn serialize<S>(date: &DateTime<Utc>, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_i64(date.timestamp())
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<DateTime<Utc>, D::Error>
    where
        D: Deserializer<'de>,
    {
        let timestamp = i64::deserialize(deserializer)?;
        Ok(Utc.timestamp(timestamp, 0))
    }
}