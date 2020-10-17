<template>
<div class="container my-5 py-3 border border-dark rounded bg-secondary text-white" style="width: 25%;">
    <div class="container" id="login">
        <img src="https://images.unsplash.com/photo-1536560035542-1326fab3a507?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        alt="welcome" class="img-fluid rounded border-dark">
        <div class="container">
            <h3 class="text-center">Login</h3>
        </div>
        <form id="loginForm" class="my-3">
            <div class="form-group">
                <label for="input_email">Email address</label>
                <input type="email" class="form-control" id="input_email" aria-describedby="emailHelp" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="input_password">Password</label>
                <input type="password" class="form-control" id="input_password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;" v-on:click="login">Login</button>
        </form>
    </div>
</div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
#login{
    text-align: left;
}
</style>
