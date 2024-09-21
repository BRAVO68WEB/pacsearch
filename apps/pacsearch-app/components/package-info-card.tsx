'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink } from "lucide-react"
import { IPkgInfo } from "@/libs/get_package_info"

export function PackageInfoCard({
  props
} : Readonly<{
  props: IPkgInfo
}>) {
  return (
    <Card className="w-full max-w-5xl bg-slate-900 text-slate-100">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl 2xl:text-3xl font-bold">
              {props.name}
            </CardTitle>
            <CardDescription className="text-slate text-lg">
              {props.version}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-slate-700 text-slate-100 text-lg" >
            {props.license}
          </Badge>
        </div>
        <p className="mt-2 text-slate-300">
          {props.description}
        </p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Repo" value={props.repo} />
          <InfoItem label="Arch" value={props.arch} />
          <InfoItem label="Base" value={props.base} />
          <InfoItem label="Build Date" value={props.build_date} />
        </div>
        <Separator className="bg-slate-700" />
        <div className="grid gap-2">
          <InfoItem label="File Name" value={props.file_name} />
          <InfoItem
            label="Home URL"
            value={
              <a
                href={props.home_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:underline"
              >
                {props.home_url} <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            }
          />
          <InfoItem label="Groups" value={props.groups} />
          <InfoItem label="Packager" value={props.packager} />
        </div>
        <Separator className="bg-slate-700" />
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Installed Size" value={props.installed_size} />
          <InfoItem label="Compressed Size" value={props.compressed_size} />
        </div>
        <Separator className="bg-slate-700" />
        <InfoItem
          label="SHA256 Sum"
          value={props.sha256_sum}
        />
        <InfoItem
          label="PGP Signature"
          value={props.pgp_signature}
          className="truncate"
        />
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="text font-medium text-slate-400">{label}</dt>
      <dd className="mt-1 text text-slate-100">{value}</dd>
    </div>
  )
}