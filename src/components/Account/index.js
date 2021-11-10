import { supabase } from '../../lib/supabase/client';

import { MdLogout } from 'react-icons/md';

import { UserPanelWrapper } from './Account.styled';

const UserEmail = () => {
  const user = supabase.auth.user();

  return (
    <span>{user.email}</span>
  )
}

const SignOutButton = () => (
  <button onClick={() => supabase.auth.signOut()}>
    <MdLogout />
  </button>
)

export const UserPanel = () => (
  <UserPanelWrapper>
    <UserEmail />
    <SignOutButton />
  </UserPanelWrapper>
)