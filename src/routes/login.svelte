<script lang="ts">
    import { url, goto } from "@roxi/routify";
    import axios from "axios";
    import iziToast from 'izitoast'
    import { Preferences } from '@capacitor/preferences';
    import 'izitoast/dist/css/iziToast.css'
    
    let endpoint = import.meta.env.VITE_ENDPOINT;
    let email = '';
    let password = '';

    const login = ()=>{
        let check = validation();
        if (check) {
            axios.post(endpoint+'login',{
                email:email,
                password:password,
            }).then((res)=>{
                let user = res.data.user;
                createUser(user.id,user.name,user.email,user.phone,user.avatar);
                $goto('/home');
            }).catch(function (error) {
                if (error.response) {
                    if(error.response.status==401){
                        iziToast.show({
                            title: 'Info!',
                            theme: 'light',
                            color: 'red',
                            position: 'topRight',
                            message: 'email or password has wrong'
                        });
                        password = '';
                    }
                }
            });
        }
    }

    async function createUser(id,name,email,phone,avatar) {
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
        
        return true;
    }
</script>

    <header class="header">
        <div class="row">
            <div class="col-auto px-0">
                <a href="{$url('/')}" class="btn menu-btn btn-link text-dark">
                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-24" viewBox='0 0 512 512'>
                        <title>ionicons-v5-a</title>
                        <polyline points='244 400 100 256 244 112' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                        <line x1='120' y1='256' x2='412' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                    </svg>
                </a>
            </div>
            <div class="text-left col">

            </div>
            <div class="ml-auto col-auto px-0">

            </div>
        </div>
    </header>


    <!-- Begin page content -->
    <main class="flex-shrink-0">
        <div class="container text-center  mt-4">
            <div class="icon icon-100 bg-white text-white mb-4 text-center">
                <img src="img/logo/fav-icon.png" alt="">
            </div>
            <h4 class="mb-4">KONDOKU</h4>
        </div>
        <div class="container">
            <div class="login-box">
                <div class="form-group floating-form-group">
                    <input bind:value={email} type="email" class="form-control floating-input" placeholder="Email">
                </div>
                <div class="form-group floating-form-group">
                    <input bind:value={password} type="password" class="form-control floating-input" placeholder="Password">
                </div>
                <!-- <div class="form-group my-4">
                    <a href="" class="link">Forget password?</a>
                </div> -->
                <button on:click={()=>login()} class="btn btn-block btn-success btn-sm"> <i class="bi bi-people"></i> Sign In</button>
            </div>
        </div>
    </main>

    <footer class="footer mt-auto py-3">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <a href="{$url('/register')}" class="link">Create Account</a>
                </div>
            </div>
        </div>
    </footer>