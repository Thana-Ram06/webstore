import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Step5Success() {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
        <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-foreground">App Submitted!</h2>
      <p className="mx-auto mt-3 max-w-sm text-base text-muted-foreground">
        Your app is now under review. We&apos;ll notify you by email within 2–3 business days.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-muted/50 px-5 py-4 text-sm text-muted-foreground max-w-sm mx-auto">
        <p className="font-medium text-foreground mb-1">What happens next?</p>
        <ul className="space-y-1 text-left list-disc list-inside">
          <li>Our team reviews your submission</li>
          <li>We verify the app meets quality standards</li>
          <li>Approved apps go live on AppVault</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href="/apps" variant="primary" size="lg">
          Browse Apps
        </Button>
        <Button href="/submit" variant="secondary" size="lg">
          Submit Another App
        </Button>
      </div>
    </div>
  )
}
