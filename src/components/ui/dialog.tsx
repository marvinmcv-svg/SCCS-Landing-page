"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className,
  children,
  closeLabel = "Close",
  overlayClassName,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string; overlayClassName?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={cn("fixed inset-0 z-[90] bg-navy-950/60 backdrop-blur-sm", overlayClassName)} />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-[12vh] z-[91] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-ivory shadow-[0_32px_80px_rgba(20,20,58,0.35)] outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="pressable absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-mist hover:bg-cream hover:text-navy-900"
          aria-label={closeLabel}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
