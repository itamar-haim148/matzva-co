import Link from "next/link";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "whatsapp" | "accent";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsLink = Common & {
  href: string;
  external?: boolean;
};

type AsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classes(variant: Variant, size: Size, extra?: string) {
  return [styles.btn, styles[variant], styles[size], extra]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = classes(variant, size, className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http") || href.startsWith("tel:")) {
      return (
        <a
          className={cls}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as AsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
