<template>
  <div flex="vcenter gap-3 md:gap-5">
    <Link to="/my-songbook">
      <HeaderNavItem icon="music" label="My songbook" />
    </Link>
    <Link to="/profile">
      <HeaderNavItem icon="user" label="Login" />
    </Link>
    <HeaderNavItem icon="bars" label="Menu" />
  </div>
</template>
