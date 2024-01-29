<script>
    export let form;
</script>

<form method="POST">
    <p>{ form?.message || "" }</p>
    
    <label for="email">Email</label>
    <input type="text" id="email" name="email" placeholder="Email">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Password">
    <button type="submit">Sign Up</button>
</form>
