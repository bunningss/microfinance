"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export function Modal({
  children,
  triggerLabel,
  triggerIcon,
  title,
  description,
  isOpen,
  onClose,
  onOpen,
  className,
  modalClassName,
  triggerSize,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Button
        className={className}
        onClick={onOpen}
        icon={triggerIcon}
        size={triggerSize}
      >
        {triggerLabel}
      </Button>

      <DialogContent className={modalClassName}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="capitalize">{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
