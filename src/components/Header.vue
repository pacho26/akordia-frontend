<template>
  <div bg="yellow">
    <Container flex="vcenter" justify="between">
      <p>Logo</p>
      <div flex="vcenter gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link :href="'https://translate.google.com/'" new-tab
          >External link</Link
        >
        <Link to="/profile">Profile</Link>
      </div>
    </Container>
  </div>
</template>
