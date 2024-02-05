<script>
    export let form;
</script>

<div class="wrapper">
    <form method="POST">
        <p>{ form?.message || "" }</p>
        
        <div class="container">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <div class="spacer-top">
                <label for="confirm">Confirm Password</label>
                <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" required>
            </div>
            <div class="spacer-top">
                <button class="btn" type="submit">Confirm</button>
            </div>
        </div>
    </form>
</div>