<script>
    export let form;
</script>

<div class="wrapper">
    <form method="POST">
        <p>{ form?.message || "" }</p>
        
        <div class="container">
            <h1>Forgot Password</h1>
            <p>We will send you an email with instructions on how to reset your password.</p>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <div class="spacer-top">
                <button class="btn" type="submit">Send</button>
            </div>
        </div>
    </form>
</div>