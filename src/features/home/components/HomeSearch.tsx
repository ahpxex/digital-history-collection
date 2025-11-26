"use client";

import { Input, Button } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export function HomeSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-4">
      <div className="w-full relative flex items-center gap-2">
        <Input
          size="lg"
          placeholder="搜索案例、工具、数据..."
          value={query}
          onValueChange={setQuery}
          startContent={<MagnifyingGlass className="text-default-400" size={20} />}
          classNames={{
            inputWrapper: "bg-default-100 hover:bg-default-200 transition-colors h-14 shadow-sm",
            input: "text-base",
          }}
        />
        <Button 
            size="lg" 
            color="primary" 
            className="h-14 px-8 font-medium shadow-md"
        >
            搜索
        </Button>
      </div>
      <Link href="/advanced-search" className="text-sm text-default-500 hover:text-primary transition-colors flex items-center gap-1">
        高级搜索 <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
