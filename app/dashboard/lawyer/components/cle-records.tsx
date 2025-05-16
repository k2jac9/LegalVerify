import { CLERecord } from "@/lib/types";
import { VerificationBadge } from "@/components/blockchain/verification-badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CLERecordsProps {
  records: CLERecord[];
}

export function CLERecords({ records }: CLERecordsProps) {
  if (!records.length) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No CLE records available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id}>
          <CardContent className="p-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{record.courseTitle}</h4>
                  <p className="text-sm text-muted-foreground">{record.providerName}</p>
                </div>
                <Badge variant="outline" className="ml-2">
                  {record.creditHours} Credit{record.creditHours !== 1 ? "s" : ""}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(record.completionDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Course #{record.id.substring(0, 6)}</span>
                </div>
              </div>
              
              <div>
                <VerificationBadge proof={record.blockchainProof} size="sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}