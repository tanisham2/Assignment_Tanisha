const container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');

signUpBtn.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInBtn.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// Google Sign-In Setup
function handleGoogleResponse(response) {
  console.log("Google JWT Token:", response.credential);
  alert("✅ Google Sign-In successful!");
}

window.onload = () => {
  if (window.google && google.accounts) {
    google.accounts.id.initialize({
      client_id: '194793097294-usovgaj71u0uspida7rhh1imv8k5dk2b.apps.googleusercontent.com',
      callback: handleGoogleResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn-signin"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn-signup"),
      { theme: "outline", size: "large" }
    );
  }
  loadFacebookSDK();
};

// Facebook Login Integration
function loginWithFacebook() {
  FB.login(function (response) {
    if (response.authResponse) {
      console.log("Facebook Login Success:", response);
      alert("✅ Facebook Login successful!");
    } else {
      alert("❌ Facebook Login cancelled.");
    }
  }, { scope: 'email,public_profile' });
}

function loadFacebookSDK() {
  window.fbAsyncInit = function () {
    FB.init({
      appId: 'YOUR_FACEBOOK_APP_ID',
      cookie: true,
      xfbml: true,
      version: 'v19.0'
    });
  };

  (function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

// LinkedIn Login
function loginWithLinkedIn() {
  const clientId = '86a03rmh1nr6xf';
  const redirectUri = window.location.origin + '/linkedin-callback.html';
  const scope = 'r_liteprofile r_emailaddress';
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  window.location.href = url;
}


//  Hook Social Buttons (f, g, in)
document.querySelectorAll('.social').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (index === 0) loginWithFacebook();
    if (index === 2) loginWithLinkedIn();
  });
});

// Sign-in Form Validation
document.querySelector('.sign-in-container form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;
  if (!email || !password) {
    alert("❗ Please fill in all fields.");
    return;
  }
  alert(`Signed in as ${email}`);
});

// Sign-up Form Validation
document.querySelector('.sign-up-container form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.querySelector('input[placeholder="Name"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;
  if (!name || !email || !password) {
    alert("❗ Please fill in all fields.");
    return;
  }
  alert(`Welcome, ${name}!`);
});
