"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MegaphoneIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  message: string;
  link: string;
  linkLabel: string;
  dismissLabel: string;
};

export function AnnouncementBar({
  message,
  link,
  linkLabel,
  dismissLabel,
}: Props) {
  const [visible, setVisible] = React.useState(true);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
        >
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 text-sm text-primary-foreground">
            <div className="flex items-center gap-2 text-primary">
              <MegaphoneIcon className="size-4" aria-hidden="true" />
              <p className="text-foreground">{message}</p>
            </div>
            <Link
              href={link}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {linkLabel}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-muted-foreground"
              onClick={() => setVisible(false)}
              aria-label={dismissLabel}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
