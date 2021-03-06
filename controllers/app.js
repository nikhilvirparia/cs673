/**
 * @author Michael Citro
 * @summary This is the main js will that will initalize the App name space
 */

// Init App
window.App = window.App || {};

window.App.isLocalHost = window.location.href.indexOf('~mc332') === -1;

// Endpoints will go here
window.App.endpoints = {
  login: window.App.isLocalHost ? '/apis/login.php' : '/~mc332/cs673/apis/login.php',
  getUserPortfolio: window.App.isLocalHost ? '/apis/getUserPortfolios.php' : '/~mc332/cs673/apis/getUserPortfolios.php',
  getPortfolioById: window.App.isLocalHost ? '/apis/getPortfolioById.php' : '/~mc332/cs673/apis/getPortfolioById.php'
}

//All Pages in out app
window.App.pages = {
  myAccount: window.App.isLocalHost ? '/pages/accountView.php' : '/~mc332/cs673/pages/accountView.php',
  portfolioView: window.App.isLocalHost ? '/pages/portfolioView.php' : '/~mc332/cs673/pages/portfolioView.php',
  stockView: window.App.isLocalHost ? '/pages/stockView.php' : '/~mc332/cs673/pages/stockView.php'
}


// function that init a page
App.init = {
  LoginScreen: initLoginScreen,
  MyAccount: initMyAccount,
  MyPortfolio: initMyPortfolio
}


// -- initalization functions --
function initMyAccount() {
  window.App.User.getUserBasicInfo([
    window.App.Portfolio.loadUserPortfolios
  ]);
}

function initMyPortfolio() {
  window.App.User.getUserBasicInfo([
    window.App.Portfolio.loadPortfolioById
  ]);
}

function initLoginScreen() {
  $("#login-form").on('submit', function (event) {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;

    window.App.User.login(email, password, function (response) {
      if (response.isUserRegistered) {
        window.location.href = window.App.pages.myAccount;
      } else {
        alert('Sorry we could not find you.')
      }
    })
  })
}
