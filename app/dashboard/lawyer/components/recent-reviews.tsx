import { LegalReview } from "@/lib/types";
import { VerificationBadge } from "@/components/blockchain/verification-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface RecentReviewsProps {
  reviews: LegalReview[];
}

export function RecentReviews({ reviews }: RecentReviewsProps) {
  if (!reviews.length) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No reviews available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.isAnonymous ? "A" : review.clientName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {review.isAnonymous ? "Anonymous Client" : review.clientName}
                  </p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <VerificationBadge proof={review.blockchainProof} size="sm" showDetails={false} />
            </div>
            <p className="mt-3 text-sm">{review.comment}</p>
            <div className="mt-2">
              <VerificationBadge proof={review.blockchainProof} size="sm" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}