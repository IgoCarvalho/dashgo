import { Link, LinkProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type ActiveLinkProps = {
  children: ReactNode;
  shouldMatchExactHref?: boolean;
} & LinkProps;

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...props
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;
  if (shouldMatchExactHref && props.href === asPath) {
    isActive = true;
  }

  if (!shouldMatchExactHref && asPath.startsWith(String(props.href))) {
    isActive = true;
  }

  return (
    <Link {...props} color={isActive ? 'pink.400' : 'gray.50'}>
      {children}
    </Link>
  );
}
