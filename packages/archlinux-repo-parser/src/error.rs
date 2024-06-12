use std::fmt::{self, Display};

use serde::{de, ser};

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Clone, Debug, PartialEq)]
pub enum Error {
    Message(String),
    Eof,
    FieldNameUnexpectedWrapper(String),
    DelimiterExpected,
    IntegerError,
    NotSupported,
    DelimiterNotExpected,
    CharOverflow,
    TrailingCharacters,
    StructExpected,
}

impl ser::Error for Error {
    fn custom<T: Display>(msg: T) -> Self {
        Error::Message(msg.to_string())
    }
}

impl de::Error for Error {
    fn custom<T: Display>(msg: T) -> Self {
        Error::Message(msg.to_string())
    }
}

impl Display for Error {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Error::Message(msg) => formatter.write_str(msg),
            Error::Eof => formatter.write_str("unexpected end of input"),
            Error::FieldNameUnexpectedWrapper(line) => formatter.write_str(&format!(
                "unexpected field wrapper at line {}. Field should start and end with '%' symbol",
                line
            )),
            Error::DelimiterExpected => formatter.write_str("delimiter expected"),
            Error::IntegerError => formatter.write_str("cannot parse integer"),
            Error::NotSupported => formatter.write_str("action not supported"),
            Error::DelimiterNotExpected => formatter.write_str("delimiter not expected"),
            Error::CharOverflow => formatter.write_str("char field must have only one letter"),
            Error::TrailingCharacters => formatter.write_str("unexpected trailing characters"),
            Error::StructExpected => formatter.write_str("expected struct type"),
        }
    }
}

impl std::error::Error for Error {}