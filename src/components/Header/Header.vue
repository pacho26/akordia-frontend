<template>
  <div p="y-2" bg="white" shadow="sm">
    <Container flex="vcenter" justify="between">
      <div flex="vcenter gap-12">
        <Link to="/">
          <p>Logo</p>
        </Link>

        <div class="p-inputgroup">
          <InputText placeholder="Search for songs, artists..." />
          <Button icon="pi pi-search" class="p-button-success" />
        </div>
      </div>

      <HeaderNav />
    </Container>
  </div>
</template>
