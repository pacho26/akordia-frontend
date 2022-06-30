<script lang="ts" setup>
// TODO: Replace with real values
const isAuthor = true;

const song = ref({
  id: 'zA16CZ',
  title: 'Devojka sa čardaš nogama',
  alternativeTitle: 'Random alternative name',
  artist: 'Đorđe Balašević',
  youtubeId: 'kr9NGtWhEOo',
  contentHtml: `<p><strong style="color: rgb(104, 159, 56);">F#m     E      C#m       D    C#      F#m</strong></p><p>Dođi, zaboravi, nudim ti noći čarobne</p><p><strong style="color: rgb(104, 159, 56);">    E       D        C#        F#m</strong></p><p>i buđenja u postelji punoj šecera</p><p>Ispred mog prozora drvo divljeg kestenja</p><p>Puno plodova koje nitko ne treba</p><p>Anđeli nek' te čuvaju kada vrijeme oboli</p><p>Da li čovjek sve baš sve na kraju preboli</p><p><br></p><p>Prijelaz: <strong style="color: rgb(104, 159, 56);">F#m  E</strong></p><p><br></p><p><strong style="color: rgb(104, 159, 56);">     D          E     C#         F#m</strong></p><p>Zaspao bih sada ja na tvojim rukama</p><p><strong style="color: rgb(104, 159, 56);">D        E          C#m</strong></p><p>Budio se ne bih nikada ...</p><p><strong style="color: rgb(104, 159, 56);">     D            E     C#        F#m</strong></p><p>neka vrijeme sada broji svoje godine</p><p><strong style="color: rgb(104, 159, 56);">D           Hm        C#sus4  C#</strong></p><p>Meni je vec dosta čekanja</p><p><br></p><p>Dođi, zaboravi, nudim ti noći čarobne</p><p>i buđenja u postelji punoj šećera</p><p>Dođi i ostani, nudim ti suze k'o bisere</p><p>Moje namjere još su uvijek skrivene</p><p><br></p>`,
});
</script>

<template>
  <div m="sm:t-2" p="y-4" border="b-1 gray-300">
    <!-- TODO: Add link to fetch all songs by artist -->
    <div text="gray-600 lg sm:2xl" font="300" class="uppercase">
      {{ song.artist }}
    </div>
    <div m="sm:t-2" text="gray-800 2xl sm:3xl" font="600">
      {{ song.title }}
    </div>
    <div font="300" v-if="song.alternativeTitle">
      ({{ song.alternativeTitle }})
    </div>
  </div>
  <RichTextEditor read-only :content="song.contentHtml" m="!t-6" />
</template>
