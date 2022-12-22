<script lang="ts">
    import axios from "axios";
    import iziToast from "izitoast";
    import { goto } from "@roxi/routify";
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
                <button on:click={()=>changeActive()} type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
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
                    <a href="index.html" class="btn btn-block btn-danger btn-sm"> <i class="bi bi-google"></i> Sign In Google</a>
                    <a href="index.html" class="btn btn-block btn-primary btn-sm"> <i class="bi bi-facebook"></i> Sign In Facebook</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal-backdrop fade show"></div>
{/if}