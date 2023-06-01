<script lang="ts">
    import { url, goto } from "@roxi/routify";
    import axios from "axios";
    import iziToast from 'izitoast'
    import 'izitoast/dist/css/iziToast.css'
    import { Preferences } from '@capacitor/preferences';

    let name = '';
    let email = '';
    let password = '';
    let phone = '';
    let endpoint = import.meta.env.VITE_ENDPOINT;

    const submit = ()=>{
        var check = validation();
        if (check) {
            axios.post(endpoint+'user',{
                name:name,
                email:email,
                password:password,
                phone:phone,
                role:4
            }).then((res)=>{
                if (res.data.status=='success') {
                    createUser(res.data.data.id,res.data.data.avatar);
                    $goto('/home')
                }
            })
        }
    }

    async function createUser(id,avatar) {
        const ret = await Preferences.set({ 
            key: 'user',
            value: JSON.stringify({
                id: id,
                name: name,
                email: email,
                phone: phone,
                avatar: avatar,
            })
        });
    }

    const validation = ()=>{
        if (name=='') {
            iziToast.show({
                title: 'Info!',
                theme: 'light',
                color: 'red',
                position: 'topRight',
                message: 'Name is required!'
            });
            return false;
        }
        if (email=='') {
            iziToast.show({
                title: 'Info!',
                theme: 'light',
                color: 'red',
                position: 'topRight',
                message: 'Email is required!'
            });
            return false;
        }
        if (password=='') {
            iziToast.show({
                title: 'Info!',
                theme: 'light',
                color: 'red',
                position: 'topRight',
                message: 'Password is required!'
            });
            return false;
        }
        if (phone=='') {
            iziToast.show({
                title: 'Info!',
                theme: 'light',
                color: 'red',
                position: 'topRight',
                message: 'Phone is required!'
            });
            return false;
        }
        
        return true;
    }
</script>
    <!-- Fixed navbar -->
    <header class="header">
        <div class="row">
            <div class="col-auto px-3">
                <a href="{$url('/')}" class="btn menu-btn btn-link text-dark ml-2" style="font-size:20pt;">
                    <i class="bi bi-arrow-left"></i>
                </a>
            </div>
            <div class="text-left col">

            </div>
            <div class="ml-auto col-auto px-0">

            </div>
        </div>
    </header>


    <!-- Begin page content -->
    <main class="bg-white" style="height: 100vh;">
        <div class="container text-center  mt-4">
            <div class="icon icon-100 bg-white text-white mb-4 text-center">
                <img src="img/logo/fav-icon.png" alt="">
            </div>
            <h4 class="mb-4">KONDOKU</h4>
        </div>
        <div class="container">
            <div class="login-box">
                <div class="form-group floating-form-group">
                    <input type="text" bind:value={name} class="form-control floating-input" placeholder="Full Name">
                </div>
                <div class="form-group floating-form-group">
                    <input type="email" bind:value={email} class="form-control floating-input" placeholder="Email">
                </div>
                <div class="form-group floating-form-group">
                    <input type="password" bind:value={password} class="form-control floating-input" placeholder="Password">
                </div>
                <div class="form-group floating-form-group">
                    <input type="text" bind:value={phone} class="form-control floating-input" placeholder="Phone">
                </div>
                <button on:click={()=>submit()} class="btn btn-block btn-success btn-sm mt-5"> <i class="bi bi-people"></i> SIGN UP</button>
            </div>
        </div>
    </main>

    <footer class="footer mt-auto py-3">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <a href="{$url('/login')}" class="link">Already Have an Account?</a>
                </div>
            </div>
        </div>
    </footer>

    <style>
        .floating-form-group .floating-input {
        background: transparent;
        border-radius: 0;
        border-width: 0px;
        border-bottom: 1px solid rgba(153, 153, 153, 0.3);
        padding: 10px 0px;
        line-height: 24px;
        z-index: 2;
        }

        .floating-form-group .floating-input:focus, .floating-form-group .floating-input:focus:active {
        border-bottom: 1px solid #FF97B5;
        }

        .floating-form-group .floating-input:focus + .floating-label, .floating-form-group .floating-input:focus:active + .floating-label {
        color: #FF97B5;
        top: 0;
        font-size: 13px;
        }
    </style>