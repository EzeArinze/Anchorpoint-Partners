import { Badge } from "@/components/ui/badge";

type Status =
  | "pending"
  | "completed"
  | "approved"
  | "rejected"
  | "active"
  | "inactive"
  | null;

type Props = {
  status: Status | string;
};

export function StatusBadge({ status }: Props) {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "approved":
      return <Badge className="bg-green-500  text-white">Approved</Badge>;
    case "completed":
      return <Badge className="bg-blue-500 text-white">Completed</Badge>;
    case "rejected":
      return <Badge className="bg-red-500 text-white">Rejected</Badge>;
    case "active":
      return <Badge className="bg-green-600 text-white">Active</Badge>;
    case "inactive":
      return <Badge variant="outline">Inactive</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
