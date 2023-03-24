import { Icon, LinkProps as ChakraLinkProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ElementType, ReactNode } from 'react';

import { ActiveLink } from '../ActiveLink/ActiveLink';

type NavLinkProps = {
  icon: ElementType;
  children: ReactNode;
} & ChakraLinkProps;

export function NavLink({ icon, children, ...props }: NavLinkProps) {
  return (
    <ActiveLink as={Link} display="flex" alignItems="center" {...props}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </ActiveLink>
  );
}
