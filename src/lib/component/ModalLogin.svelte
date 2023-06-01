<script lang="ts">
    import axios from "axios";
    import iziToast from "izitoast";
    import { goto, url } from "@roxi/routify";
    import { Preferences } from '@capacitor/preferences';
    import 'izitoast/dist/css/iziToast.css'


    export let isActive;
    export let user;
    let endpoint = import.meta.env.VITE_ENDPOINT;
    let email = '';
    let password = '';
    const changeActive = ()=> {
        isActive = !isActive;
    }
    const login = ()=>{
        let check = validation();
        if (check) {
            axios.post(endpoint+'login',{
                email:email,
                password:password,
            }).then((res)=>{
                let users = res.data.user;
                createUser(users.id,users.name,users.email,users.phone,users.avatar);
                getUser();
                isActive = false;
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

    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
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

{#if isActive}
<div class="modal fade show" style="display: block;" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login Form</h5>
                <button type="button" on:click={()=>changeActive()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="login-box">
                    <div class="mb-3">
                        <input bind:value={email} type="email" class="w-100 border-0 border-bottom form-control" placeholder="Email">
                    </div>
                    <div class="mb-3">
                        <input bind:value={password} type="password" class="w-100 border-0 border-bottom form-control" placeholder="Password">
                    </div>
                    <!-- <div class="form-group my-4">
                        <a href="" class="link">Forget password?</a>
                    </div> -->
                    <button on:click={()=>login()} class="btn btn-block btn-success btn-sm"> <i class="bi bi-people"></i> Sign In</button>
                    <a href="{$url('/register')}" class="btn btn-block btn-primary btn-sm"> <i class="bi bi-people-fill"></i> Sign Up</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal-backdrop fade show"></div>
{/if}