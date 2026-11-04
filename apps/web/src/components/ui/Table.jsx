import React from "react";

export function Table({ children, className = "", ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-surface-container-high bg-surface-container-lowest">
      <table className={`w-full text-left text-xs font-mono ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <thead
      className={`bg-surface-container border-b border-surface-container-high text-outline uppercase tracking-wider text-[11px] ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr
      className={`hover:bg-surface-container/50 transition-colors border-b border-surface-container-high last:border-b-0 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <th className={`p-3 font-semibold ${className}`} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td className={`p-3 ${className}`} {...props}>
      {children}
    </td>
  );
}

