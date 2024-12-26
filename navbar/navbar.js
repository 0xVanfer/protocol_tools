const navbarHTML = `
    <div class="navbar">
        <div class="nav-item" id="nav-protocols">
            <span>Protocols <span class="nav-arrow">&#9660;</span></span>
            <div class="nav-dropdown-content">
                <a href="${toHome}cian_yield_layer/yield_layer.html">Cian Yield Layer</a>
                <a href="${toHome}pendle_eqb/eqb_pools.html">Equilibria</a>
            </div>
        </div>
        <div class="nav-item" id="nav-addresses">
            <span>Addresses <span class="nav-arrow">&#9660;</span></span>
            <div class="nav-dropdown-content">
            </div>
        </div>
        <div class="nav-item" id="nav-tools">
            <span>Tools <span class="nav-arrow">&#9660;</span></span>
            <div class="nav-dropdown-content">
            </div>
        </div>
    </div>
`

document.body.innerHTML += navbarHTML;

// Click on navbar events.
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.stopPropagation(); 
        document.querySelectorAll('.nav-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        this.classList.toggle('active');
    });
});

// Other clicks deactive the navbar.
document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar')) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});
