<script lang="ts">
</script>

<nav>
  <ul>
    <li><a href="/">By Dictionary</a></li>
    <li><a href="/artists">By Artists</a></li>
  </ul>
</nav>

<slot />

<style>
nav {
  background: #ff7900;
  padding: 1rem;
  font-family: Helvetica, Arial, sans-serif;
}
ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, sans-serif;
}
li {
  display: inline;
}
a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
}
a:hover {
  color: #0070f3;
}
</style>
