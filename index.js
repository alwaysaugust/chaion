// js for chaion




$( document ).ready(function(){






// -- @ HEADER
// ------------------------------


    
// toggle header links 
$( "body" ).on( "click", ".header_link", function(){
    
    
 var link = $(this).attr( "data-link-to" );
    
 var pos = (function(){
     
  var n = $( "[data-link-from='"+link+"']" ).offset().top;
     
  if ( link == "team" || link == "news" ){
   
  return n - ( $(".header").outerHeight(true) + 50 );
      
  } else {
   
   return n - $(".header").outerHeight(true);
      
  }
     
     
 }) ();
    
    
 $( window ).scrollTop( pos );

    
    
    
}); // end of click .header_link


    
    
    
// store section positions 
var section_positions = [];
    
function store_pos() {
    

 $( "[data-link-from]" ).each(function(){
     
  var link = $(this).attr( "data-link-from" );
  var t = $(this);
     
  var pos = (function(){
     
  var n = $( t ).offset().top;
     
  if ( link == "team" || link == "news" ){
   
  return n - ( $(".header").outerHeight(true) + 50 );
      
  } else {
   
   return n - $(".header").outerHeight(true);
      
  }
     
     
 }) ();
     
  section_positions.push( pos );
     
 }); // end of each linkable section
    
    
    
} // end of store_pos function
    
    
    
    
    
    
    
  
    
// - @ Window Scroll : highlight header link when in section
// ------------------------
     
// check scroll pos
function check_scroll_pos(){
    
    
 var curr_pos = $( window ).scrollTop() + 6;
    
 $( "[data-link-from]" ).each(function(i){
     
  var pos = section_positions[i];
  var header_link = $(this).attr( "data-link-from" );
     
  if ( curr_pos >= pos ){
      
   
    $( ".header_link[data-link-to='"+header_link+"']" ).addClass( "_on_header_link" ).siblings().removeClass( "_on_header_link" );
     
      
     } // end of if in section
     
     
 }); // end of each

    
 requestAnimationFrame(check_scroll_pos);
    
    
} // end of check_scroll_pos

    
    
// start check 
 requestAnimationFrame(check_scroll_pos);

    
    
    
// show languages dropdown 
$( "body" ).on( "click", "._lang", lang_dropdown );
    
    
    
function lang_dropdown(){
    
    
 var right_pos = $( "._lang" ).offset().left - $( "._lang" ).width();
 var top_pos = $( ".header" ).outerHeight(true);
    
 var dropdown = "<div class='lang_dropdown'>\
                 <div class='lang_col' data-lang='en'> English </div>\
                 <div class='lang_col' data-lang='chinese'>  中文版 </div>\
                </div>";
    
    
    
 if ( $( ".lang_dropdown" ).length > 0 ){
  
   return;
     
 } else {
  
    $( "body" ).append( dropdown );
    
    $( ".lang_dropdown" ).css({"top": top_pos, "left": right_pos });
     
     var active_lang = $( "._lang" ).attr( "data-lang" );
     
    $( ".lang_col[data-lang='"+active_lang+"']" ).addClass( "_on_lang" );
     
     
 } // end of else
    
    
 
} // end of lang_dropdown()

    
    
    
    
    
    
    
    
// to toggle languages
$( "body" ).on( "click", ".lang_col", function(){
   
 var lang = $( this ).attr( "data-lang" );

    
    
 if ( $(this).hasClass( "_on_lang" ) ){
  
    return;
     
 } else {
  
   $( this ).addClass( "_on_lang" ).siblings().removeClass( "_on_lang" );
   
   $( "._lang" ).attr( "data-lang", $( "._on_lang" ).attr( "data-lang" ) );
     
   var lang_text = (function(){
       
     if ( lang == "en" ){
      
      return "English";
         
     } else {
      
      return "中文版";
         
     }
       
   }) ();
     
   $( "._lang span" ).text( lang_text );
     
     
     $( "div[data-alt-lang]" ).each( function(){
         
        var chang_lang = $( this ).attr( "data-"+lang );
         
         if ( $( this ).attr( "data-trim-text" ) ){
          
           var text = shorten( chang_lang, Number($(this).attr( "data-trim-text" ) ) );
             
           $( this ).text( text );
                          
           return;
             
             
         } else {
          
          $( this ).text( chang_lang );
             
             
         }
         
         
     }); // end of each
     
     
     
     
 } // end of else 
    
    
    
});
    
    
    
    
    
    
    
    
    
// to hide language dropdown
$( "body" ).on( "mouseleave touchend", ".lang_dropdown", function(){
   
 $(this).remove();
    
});
    
    
    
    
    
    
    
    
    
    
    
    



    
    
    
    
    
    
 
    
// -- @ Roadmap
// --------------------------------
   
    
// to see roadmap details
$( "body" ).on( "click", "._view_details", function(){
    
 var icon = $( this ).parent().find( ".col_icon img" ).attr( "src" );
 var text = $( this ).parent().attr( "data-text" );
 var link = $( this ).parent().attr( "data-link" );
    
 modal(icon,text,link);
    
    
}); // end of click ._view_details
    
    
    
    
// toggle roadmap content
$( "body" ).on("click", ".toogle_road_map", function(){
   
    
 if ( $(this).hasClass( "_hide_map" )){
  
   $(this).removeClass( "_hide_map" ).addClass( "_show_map" );
   $( ".timeline_col_wrap" ).slideUp();
     
  $( "._fb1 ._bc_3" ).addClass( "_extra_padd_bottom" );
     
    return;
     
 } if ( $(this).hasClass( "_show_map" )){
     
  $(this).removeClass( "_show_map" ).addClass( "_hide_map" );
  $( ".timeline_col_wrap" ).slideDown();
     
  $( "._fb1 ._bc_3" ).removeClass( "_extra_padd_bottom" );
    
     
 }
    
 
    
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    




    
    
    
   
    
// -- @ What We Offer
// --------------------------------
    

    
    
    
// toggle tabs
$( "body" ).on( "click", ".tab", function(){
        
 // do something with content ..
 
 var ind = $( this ).index();
    
 if ( ind == 0 ){
  
   move_card("left" );
     
 } if ( ind == 2 ){
  
  move_card("right" );
     
 }

    

    
});  // end of toggle tabs
    
    
    
    
    
    
    
// toggle cards
$( "body" ).on( "click", ".toggle_button", function(){
    
    
        
    
 if ( $(this).hasClass( "_left_toggle" )){
  
    // toggle left
     move_card("left");
     
     
    } if ( $(this).hasClass( "_right_toggle" )){
     
    
     move_card("right");
     
     
 } // end of if toggle right
    

    
    
    
}); // end of toggle_button
    
    
    
    

    
    
    
// move card 
function move_card(direction){
    
 $( ".card_row" ).removeClass( "slide_up_fade_2" ).removeAttr( "data-check-visibility" );
    
 if ( direction == "right" ){
     
  // move right
  // toggle right    
     $( "._on_card" ).removeClass( "_on_card" ).next().addClass( "_on_card" ).prev().prev().insertAfter( "._on_card" );
        
    $( "._on_tab" ).removeClass( "_on_tab" ).next().addClass( "_on_tab" ).prev().prev().insertAfter( "._on_tab" );
     
     
 } if ( direction == "left" ){
  
  // move left
  $( "._on_card" ).removeClass( "_on_card" ).prev().addClass( "_on_card" ).next().next().insertBefore( "._on_card" );
        
    
     $( "._on_tab" ).removeClass( "_on_tab" ).prev().addClass( "_on_tab" ).next().next().insertBefore( "._on_tab" );
     
 }
    
    
    
    
    
} // end of move_card
    
    
    
    
    
    
    
        
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
// -- @ Popup modal 
// --------------------------
function modal(x,y,z){
    
    

    
 var modal = (function(){
     
     
  if ( x == "wechat" ){
      
   // return wechat modal
      
   return "<div class='modal'>\
            <div class='center_col flex_center_col'> \
              <div class='modal_icon _qr_code'> <img src='"+y+"'> </div>\
             </div> <!-- end of center_col -->\
            <div class='close_button _close_modal'></div>\
           </div> <!-- end of modal -->";
      
      
  } if( x == "contact" ){
      
   // contact form
   return "<div class='modal _contact_modal'>\
            <div class='center_col flex_center_col'>\
              <div class='modal_title'>Have a question? Drop us a line </div>\
              <div class='input_wrap'>\
               <input type='text' name='name' id='user_name' class='_input_field' placeholder='Enter name'>\
              </div> <!-- end of input_wrap -->\
               <div class='input_wrap'>\
               <input type='email' name='email' id='user_email' class='_input_field' placeholder='Enter email'> \
              </div> <!-- end of input_wrap -->\
               <div class='input_wrap _msg_box'>\
               <textarea name='message' id='msg' class='_input_field' placeholder='Your message'></textarea>\
              </div> <!-- end of input_wrap -->\
              <div class='modal_button _submit_form _bg_gradient_2'>  </div>\
             </div> <!-- end of center_col -->\
            <div class='close_button _close_modal'></div>\
            </div> <!-- end of modal -->";
      
      
      
  } if ( x == 1 ){

    // email error  
    return "<div class='modal _contact_modal _padding'>\
            <div class='center_col flex_center_col'>\
              <div class='modal_icon'><img src='graphics/misc/cancel.svg'></div>\
              <div class='modal_title'>"+y+"</div>\
              <div class='modal_text'>"+z+"</div>\
             </div> <!-- end of center_col -->\
            <div class='close_button _close_modal'></div>\
            </div> <!-- end of modal -->";
      
  } if ( x == "complete" ){
   
     // form sent 
     return "<div class='modal _contact_modal _padding'>\
            <div class='center_col flex_center_col'>\
              <div class='modal_icon _round _bg_gradient_2 flex_center_col'><img src='graphics/misc/check-white.svg'></div>\
              <div class='modal_title'>Email successfully sent!</div>\
             </div> <!-- end of center_col -->\
            <div class='close_button _close_modal'></div>\
            </div> <!-- end of modal -->";
      
  }else {
      
   // return roadmap modal
  return "<div class='modal'> \
           <div class='center_col flex_center_col'> \
            <div class='modal_icon'> <img src='"+x+"'> </div>\
            <div class='modal_text'>"+y+" </div>\
            <div class='card_button _modal_button'> Learn more <img src='graphics/misc/right-arrow-white.svg'> <a href='"+z+"' class='fixed_link' target='_blank'></a> </div>\
           </div> <!-- end of center_col -->\
           <div class='close_button _close_modal'></div>\
          </div> <!-- end of popup_modal -->";
      
      
  }
     
     
     
     
     
 }) ();
        
    
 
 $( ".modal_wrap" ).empty();

 $( "body" ).addClass( "_clip" ).append( "<div class='modal_wrap flex_center_col'>"+modal+"</div>" );
    
    
    
    
} // end of modal() 
    

    
    
    
    
    
// close modal 
$( "body" ).on( "click", "._close_modal", close_modal );
    
    
function close_modal(){
    
 $( ".modal_wrap" ).remove();
    
 $( "body" ).removeClass( "_clip" );
    
    
    
} // end of close_modal()
    
    
    
    
    
    
    
// see wechat qrcode in modal
$( "body" ).on( "click", "._wechat", function(){
   
 modal("wechat", "pics/qr-code/wechat.png" );
    
});
    
    
    
    
    
    
    
    
    
    
    
    
// -- @ grab page content 
// -----------------------------
function get_page_content(){
    
    
 $( "._shell" ).empty();
 
   
 $.get("content.json", function(data){
   
  //var res = JSON.parse( response );
    
    
  var what_we_offer = data.offer;
  var roadmap = data.roadmap;
  var recent_news = data.news;
  var team_members = data.team;
    
  show_offers( what_we_offer );
  show_roadmap( roadmap );
  show_news( recent_news );
  show_team( team_members );
  
  store_pos();  
  
}); // end of get content  
    
    
    
} // end of get_page_content
    
    
    

    
    
    
    

// shortern string length
function shorten(str,n) {
  return (str.match(RegExp(".{"+n+"}\\S*"))||[str])[0];
}
    
    
    
    
    
    
    
// show what we offer content 
function show_offers(data){
    
    
 for ( i = 0; i < data.length; i ++ ){
        
 var active_card = (function(){
     
    if ( i == 1 ) return "_on_card";
     
 }) ();

     
  var cut_text = shorten(data[i].text.en,135) + "...";
     
 var offer = "<div class='card_row "+active_card+"' data-title='"+data[i].title+"' data-check-visibility data-fade-2='true'>\
              <div class='card_pic'> <img src='"+data[i].pic+"'> </div>\
              <div class='card_details_col flex_center_col'>\
               <div class='center_col'>\
                <div class='card_text' data-chinese='"+data[i].text.chinese+"' data-en='"+data[i].text.en+"' data-trim-text='135' data-alt-lang>"+cut_text+"</div>\
                <div class='card_button'> Learn more <img src='graphics/icons/what-we-offer/right-arrow.svg'> </div>\
               </div> <!-- end of center_col -->\
              </div> <!-- end of card_details -->\
             </div> <!-- end of card_row -->";
    
  
  $( ".card_scroll_wrapper" ).append( offer );
     
     
    
 } // end of for     
    
    
} // end of show_offers
    
    
    
    
    
    
    
// get roadmap
function show_roadmap(data){
    
    
  for ( i = 0; i < data.length; i ++ ){
        

 var block = "<div class='time_col' data-text='"+data[i].info.en+"' data-link='"+data[i].link+"' data-chinese='"+data[i].info.chinese+"' data-en='"+data[i].info.en+"'>\
              <div class='col_icon'> <img src='"+data[i].icon+"'> </div>\
       <div class='col_text _title'>"+data[i].projection+" </div>\
       <div class='col_text _thin'>"+data[i].tech+" </div>\
       <div class='col_text _thin'>"+data[i].release+" </div>\
       <button class='timeline_button _bg_gradient_2 _view_details'> View Details </button>\
      </div> <!-- end of time_col -->";
    
  
  $( ".timeline_col_wrap" ).append( block );
     
     
    
 } // end of for 
   
    
    
} // end of show_roadmap()
    
    
    
    
    
    
    
    
    
    
    
// get news data
function show_news(data){
    
  
 for ( i = 0; i < data.length; i ++ ){
        
     
 var cut_text = shorten(data[i].text.en,120) + "...";

 var block = "<div class='news_row flex_center_col'>\
      <div class='center_col'>\
       <div class='date_text'>"+data[i].date+"</div>\
       <div class='article_title'>"+data[i].title+"</div>\
       <div class='article_text' data-chinese='"+data[i].text.chinese+"' data-en='"+data[i].text.en+"' data-trim-text='120' data-alt-lang>"+cut_text+"</div>\
       <div class='card_button'> Read more <img src='graphics/misc/right-arrow-white.svg'> <a href='"+data[i].link+"' class='fixed_link' target='_blank'></a> </div>\
      </div> <!-- end of center_col -->\
     </div> <!-- end of news_row -->";
    
  
  $( ".news_col" ).append( block );
     
     
    
 } // end of for 
    
    
    
    
} // end of show_news()
    

    
    
    
    
    
    
    
    
    
    
    
    
// show team
function show_team(data){
    
    
    
 for ( i = 0; i < data.length; i ++ ){
        

 var block = "<div class='team_member_row' data-check-visibility data-fade-2='true'> \
              <div class='member_pic'> <img src='"+data[i].pic+"'> </div>\
              <div class='member_info_col'>\
               <div class='member_text _job_title'>"+data[i].role+"</div>\
               <div class='member_text _name'>"+data[i].name+"</div>\
              </div> <!-- end of member_info_col -->\
             </div> <!-- end of team_member_row -->";
    
  
  $( ".team_profile_col" ).append( block );
     
     
    
 } // end of for 
    
    
    
    
    
    
} // end of show_team
    
    
    
    
    
    
    
    
    
    
    
    
    
    
// -- @ contact us
// -------------------------------
    
// to see form 
$( "body" ).on( "click", "._contact_us", function(){
    
 modal("contact");
    
}); 
    
    
    
    
// submit contact form
$( "body" ).on( "click", "._submit_form", submit_form );
    
    
    
function submit_form(){
    
    
  var name = $( "#user_name" ).val();
  var email = $( "#user_email" ).val();
  var msg = $.trim( $( "#msg" ).val() );
    
  var check_inputs = (function(){
      
     if ( name.length > 0 && email.length > 2 & msg.length > 0 && msg != "Your message" ) { 
         
     return true;
     }
    
  }) ();
      
    
  if ( check_inputs == true ){
      
   
    $( "._submit_form" ).removeClass( "._submit_form" ).addClass( "_sending" );
      
    // send form 
   send_form(name,email,msg);
      
      
  } else {
      
   // incomplete form
      
   $( "._input_field" ).each( function(){
       
     if ( $(this).val() <= 0 || $.trim( $(this).val() ) == "Your message" ){
      
      $( this ).parent().addClass( "_error" );
         
     }
    
    }); // end of each
      
   
      
      
  }
  
    
    
    
    
} // end of submit form
    
    
       
    
    
    
    
// focus msg input
$( "body" ).on( "focus", "#msg", function(){
    
 if ( $.trim( $(this).val() ) == "Your message" ){
  
   $(this).val( " " );
     
 }
    
}).on( "blur", "#msg", function(){
   
 if ( $.trim( $(this).val() ).length <= 0 ){
  
  $(this).val( "Your message" );
     
 }
    
    
});
    
    
    
    
    
    
    
// submit form
function send_form(name,email,msg){
    
    
 $.post("email.php",{
    
  name: name,
  email: email,
  msg: msg
     
     
 }, function(response){
   
  var res =  JSON.parse(response);

  
  if ( res == 2 || res =="2" ){
   
    // successfully sent msg      
    modal("complete");
      
  } else {
   
    modal(1,"Invalid email","Please enter a valid email address and try again.");
      
  }
     
     
     
          
 }).fail( function() {
      
   // failed to reach server 
   modal( 1,"Network Error","Please make sure you are connected to the internet and try again.");
      
  }); // end of fail     
    
    
    
    
    
    
} // end of submit_form
    
    

    
    
    
    
    
    
    
    
    
//  -- @@ mobile menu
// ---------------------------
$( "body" ).on( "click", "._open_menu", mobile_menu );
    
    
function mobile_menu(){
    
 var menu = "<div class='mobile_menu flex_center_col'>\
             <div class='menu_link'> Home </div>\
             <div class='menu_link'> About Chaion </div>\
             <div class='menu_link'> Products </div>\
             <div class='menu_link'> Partners </div>\
             <div class='menu_link'> Our Team </div>\
             <div class='menu_link'> News </div>\
             <div class='header_button _contact_us flex_center_row'> Contact Us </div>\
            </div>";
    
    
 $( "._open_menu" ).removeClass( "_open_menu" ).addClass( "_close_menu" );
    
 $( "body" ).addClass( "_clip" ).append( menu );
    
    
 $( ".mobile_menu" ).css("top", $( ".header" ).outerHeight(true) );
    
    
    
    
} // end of mobile_menu 
    
    
    
    
// close menu 
$( "body" ).on( "click", "._close_menu", close_menu );
    
function close_menu(){
 
 $( ".mobile_menu" ).remove();
 $( "body" ).removeClass( "_clip" );
    
 $( "._close_menu" ).removeClass( "_close_menu" ).addClass( "_open_menu" );
    
} // end of close_menu
    
    
    
    
    
$( "body" ).on( "click", ".menu_link", function(){
   
 var i = $(this).index();
 
 $( "body,html" ).animate({"scrollTop": section_positions[i] });
    
 close_menu();
    
   
}); // end of click menu_link

    
    
    

    
    
    
    
    
    
    
    
    
    
    
// -- @@ Animations --
// ---------------------------------
    
    
var visibileID;
    
function check_visibility(){
    
    
 $( "[data-check-visibility]" ).each(function(){
  
    var el_top = $(this).offset().top;
    var el_bottom = el_top + $( this ).outerHeight(true);
     
    var view_top = $( window ).scrollTop();
    var view_bottom = view_top + $( window ).height();
     
     
     if ( el_top < view_bottom ){
      
       //console.log( "this is now in view" );
         
       $( this ).addClass( "slide_up_fade_in" );
         
       cancel_check_visibility();
         
     } else {
         
         
      visibileID = requestAnimationFrame(check_visibility);
         
     }
     
     
     
  });
    
    
    

    
    
} // end of check_visibilty()
    
    
    

// start check
//requestAnimationFrame(check_visibility);
    
    
    
// stop check: 
// .. once all elements have been animated in
function cancel_check_visibility(){
    
 cancelAnimationFrame(visibileID);
    
    
} // end of cancel_check_visibility

    
    
    
$( window ).on( "scroll", function(){
    
    
 var view_top = $( window ).scrollTop();
 var view_bottom = view_top + $( window ).height();
 
    
 $( "[data-check-visibility]" ).each(function(){
  
    var el_top = $(this).offset().top;
    var el_bottom = el_top + $( this ).outerHeight(true);
     
     
     if ( el_top < view_bottom ){
      
       //console.log( "this is now in view" );
         
        if ( $(this).attr( "data-fade-2" ) == "true" ){
         
         $(this).addClass( "slide_up_fade_2" );
                     
            
        } else {
         
       $( this ).addClass( "slide_up_fade_in" );
         
         
        }
            
     } 
     
     
     
  });
    
    
    
  
    
    
    
    
}); // end of scroll
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//store_pos();     
get_page_content();

   
        







}); // end of document 