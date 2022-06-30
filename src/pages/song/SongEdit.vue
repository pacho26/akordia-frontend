<script lang="ts" setup>
const song = ref({
  id: 'zA16CZ',
  title: 'Devojka sa čardaš nogama',
  artist: 'Đorđe Balašević',
  youtubeId: 'kr9NGtWhEOo',
  // TODO: Add createdAt/updatedAt property
  content: `<p><span style="color: rgb(99, 182, 219);">F#m</span>     <span style="color: rgb(99, 182, 219);">E</span>      <span style="color: rgb(99, 182, 219);">C#m</span>       <span style="color: rgb(99, 182, 219);">D</span>    <span style="color: rgb(99, 182, 219);">C# </span>     <span style="color: rgb(99, 182, 219);">F#m</span></p><p>Dođi, zaboravi, nudim ti noći čarobne</p><p>    <span style="color: rgb(99, 182, 219);">E</span>       <span style="color: rgb(99, 182, 219);">D</span>        <span style="color: rgb(99, 182, 219);">C# </span>       <span style="color: rgb(99, 182, 219);">F#m</span></p><p>i buđenja u postelji punoj šecera</p><p>Ispred mog prozora drvo divljeg kestenja</p><p>Puno plodova koje nitko ne treba</p><p>Anđeli nek' te čuvaju kada vrijeme oboli</p><p>Da li čovjek sve baš sve na kraju preboli</p><p><br></p><p>Prijelaz: <span style="color: rgb(99, 182, 219);">F#m</span> <span style="color: rgb(99, 182, 219);">E</span></p><p><br></p><p>     <span style="color: rgb(99, 182, 219);">D</span>          <span style="color: rgb(99, 182, 219);">E</span>     <span style="color: rgb(99, 182, 219);">C# </span>        <span style="color: rgb(99, 182, 219);">F#m</span></p><p>Zaspao bih sada ja na tvojim rukama</p><p><span style="color: rgb(99, 182, 219);">D</span>        <span style="color: rgb(99, 182, 219);">E</span>          <span style="color: rgb(99, 182, 219);">C#m</span></p><p>Budio se ne bih nikada ...</p><p>     <span style="color: rgb(99, 182, 219);">D</span>            <span style="color: rgb(99, 182, 219);">E</span>     <span style="color: rgb(99, 182, 219);">C# </span>       <span style="color: rgb(99, 182, 219);">F#m</span></p><p>neka vrijeme sada broji svoje godine</p><p><span style="color: rgb(99, 182, 219);">D</span>           <span style="color: rgb(99, 182, 219);">Hm</span>        <span style="color: rgb(99, 182, 219);">C#sus4</span> <span style="color: rgb(99, 182, 219);">C#</span></p><p>Meni je vec dosta čekanja</p><p><br></p><p>Dođi, zaboravi, nudim ti noći čarobne</p><p>i buđenja u postelji punoj šećera</p><p>Dođi i ostani, nudim ti suze k'o bisere</p><p>Moje namjere još su uvijek skrivene</p><p><br></p>`,
});
</script>

<template>
  <SongForm :song="song" />
</template>
