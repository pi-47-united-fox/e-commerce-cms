<template>
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-primary mb-5 fixed-top">
        <a class="navbar-brand text-white" href="#">E-commerce CMS</a>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link text-white" href="#" id="DashboardNav"
                        v-on:click="dashboard">Dashboard</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link text-white" href="#" id="LoginNav"
                        v-on:click="showLoginForm">Login</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link text-white" href="#" id="AddNav"
                        v-on:click="showAddForm">Add</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" id="logout"
                        v-on:click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>

</style>