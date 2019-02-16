$(function (){
  $('#masthead h1').hide();
  $('#masthead p').hide();
  $('#masthead p').fadeIn(3000);
  $('#masthead h1').fadeIn(3000);
  $('#ban').hide();
  $('#ban').slideDown(3000);
});
$(function(){
  $('#mynavbar ul').hide();
  $('#mynavbar ul').fadeIn(3000);
});
$(".apply").click(function() {
    $('html,body').animate({
        scrollTop: $("#speaker-form").offset().top},
        'slow');
});
$(".lis").click(function() {
    $('html,body').animate({
        scrollTop: $("#community").offset().top},
        'slow');
});
$(".lis1").click(function() {
    $('html,body').animate({
        scrollTop: $("#speaker-form").offset().top},
        'slow');
});
$(".lis2").click(function() {
    $('html,body').animate({
        scrollTop: $("#funds").offset().top},
        'slow');
});
$(".lis3").click(function() {
    $('html,body').animate({
        scrollTop: $("#roadshow").offset().top},
        'slow');
});
$(".lis5").click(function() {
    $('html,body').animate({
        scrollTop: $("#contact").offset().top},
        'slow');
});
$(".lis4").click(function() {
    $('html,body').animate({
        scrollTop: $("#portfolio").offset().top},
        'slow');
});
$('.message a').click(function() {
  $('form').animate({
    height: "toggle",
    opacity: "toggle"
  }, "slow");
});
$(".lis9").click(function() {
    $('html,body').animate({
        scrollTop: $("#startup").offset().top},
        'slow');
});
$(".lis8").click(function() {
    $('html,body').animate({
        scrollTop: $("#mentor").offset().top},
        'slow');
});
