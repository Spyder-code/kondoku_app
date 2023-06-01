<!-- screen loader -->
<div class="container-fluid h-100 loader-display">
    <div class="row h-100">
        <div class="align-self-center col">
            <div class="logo-loading d-flex justify-content-center">
                <div>
                        <div class="icon icon-100 text-white mb-4">
                            <img src="https://www.kondoku.co.id/frontend/img/logo/fav-icon.png" alt="KONDOKU">
                        </div>
                        <!-- <h4 style="color: #bec030;">KONDOKU</h4> -->
                        <h4 style="color: #bec030;">Loading <span class="tracking-out-contract-bck">....</span></h4>
                        <div class="loader-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .tracking-out-contract-bck {
        -webkit-animation: tracking-out-contract-bck 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) infinite reverse both;
                animation: tracking-out-contract-bck 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) infinite reverse both;
    }

    @keyframes tracking-out-contract-bck{0%{transform:translateZ(0);opacity:1}60%{opacity:1}100%{letter-spacing:-.5em;transform:translateZ(-500px);opacity:0}}
</style>