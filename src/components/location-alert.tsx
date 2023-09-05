import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { hourlyDataType } from "@/pages/search-locations/[id]"
import Link from "next/link"

export default function LocationAlert({ locationListData }: hourlyDataType) {
  const locationListMap = locationListData.map((location: any) => {
    return (
      <li key={location.lat}>
        <Link
          href={`/search-locations/${location.name}${
            location.state ? "," + location.state : ""
          },${location.country}`}
        >
          {location.name +
            ", " +
            (location.state ? location.state + ", " : "") +
            location.country}
        </Link>
      </li>
    )
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger>Change location</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select location</AlertDialogTitle>
          <AlertDialogDescription>
            <ul>{locationListMap}</ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
