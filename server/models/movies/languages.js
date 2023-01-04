const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    
  lang_id: {type: String,
    required: true,
  },
  lang_collection_index: {
    type: String,
    required: true,
  },
  language_title: {type: String,
    required: true,
  },
  keyword: {type: String,
    required: true,
  },
  flag: {type: String,
    required: true,
  },
  // landing page
  world_best: {type: String,
    default: null
  },
  movies_of_this_season: {type: String,
    default: null
  },
  sign_in: {type: String,
    default: null},

    sign_up: {type: String,
    default: null
    },
    download_favourites: {type: String,
    default: null
    },
    it_supper_easy: {type: String,
    default: null
    },
    whats_New_on_salomtv: {type: String,
        default: null
    },
    terms_and_conditions: {type: String,
        default: null
    },
    
    watch_anywhere_you_want:{type: String,
        default: null
    },
    watch_an_endless:{type:String,
      default: null  
    },
    popuplar_movies_and_shows:{type:String,
        default: null  
    },
    play_now:{type:String,
        default: null  
    },
    more_details:{type:String,
        default: null  
    },
    trendin_see_all:{type:String,
        default: null  
    },
    trendin_see_all:{type:String,
      default: null  
  },
  your_fovourites:{type:String,
    default: null  
},
featured_movies_to_watch_now:{type:String,
  default: null  
},
upcoming_movies:{type:String,
  default: null  
},
watch_now:{type:String,
  default: null  
},
tv_thrillers:{type:String,
  default: null  
},
see_all:{type:String,
  default: null  
},
//header
home:{type:String,
  default: null  
},
tv_show:{type:String,
  default: null  
},
serials:{type:String,
  default: null  
},
movies:{type:String,
  default: null  
},
watch_list:{type:String,
  default: null  
},
kids_section:{type:String,
  default: null  
},
my_profile:{type:String,
  default: null  
},
pricing_plan:{type:String,
  default: null  
},
logout:{type:String,
  default: null  
},
// footer
movie_categories:{type:String,
  default: null  
},
tv_series:{type:String,
  default: null  
},
support:{type:String,
  default: null  
},
support:{type:String,
  default: null  
},
privacy_policy:{type:String,
  default: null  
},
// user_profile

account_setting:{type:String,
  default: null  
},
edit:{type:String,
  default: null  
},
user_name:{type:String,
  default: null  
},
user_description:{type:String,
  default: null  
},
personal_details:{type:String,
  default: null  
},
email:{type:String,
  default: null  
},
Password:{type:String,
  default: null  
},
phone_number:{type:String,
  default: null  
},
date_of_birth:{type:String,
  default: null  
},
language:{type:String,
  default: null  
},
billing_details:{type:String,
  default: null  
},
your_next_billing_date_is:{type:String,
  default: null  
},
cancel_membership:{type:String,
  default: null  
},
plan_details:{type:String,
  default: null  
},
change:{type:String,
  default: null  
},
update_payment_info:{type:String,
  default: null  
},
change_plan:{type:String,
  default: null  
},
// Pricing Plan

pricing_plan:{type:String,
  default: null  
},
new_movies:{type:String,
  default: null  
},
salomtv_special:{type:String,
  default: null  
},
america_tv_shows:{type:String,
  default: null  
},
hollywood_movies:{type:String,
  default: null  
},
video_quality:{type:String,
  default: null  
},

add_free_entertainment:{type:String,
  default: null  
},
purchase:{type:String,
  default: null  
},
///Sign In
sign_in:{type:String,
  default: null  
},
forgot_your_password:{type:String,
  default: null  
},
remember_me:{type:String,
  default: null  
},
dont_have_an_account:{type:String,
  default: null  
},

// sign_up opt page
sign_up:{type:String,
  default: null  
},


//sign_up page

i_accept_terms_and_conditions:{type:String,
  default: null  
},
i_accept:{type:String,
  default: null  
},
terms_and_conditions:{type:String,
  default: null  
},
alread_have_an_account:{type:String,
  default: null  
},
sign_up_u:{type:String,
  default: null  
},
sign_in:{type:String,
  default: null  
},

//Modal
crime:{type:String,
  default: null  
},
drama:{type:String,
  default: null  
},
mystery:{type:String,
  default: null  
},
add_to_favourites:{type:String,
  default: null  
},
more_like_this:{type:String,
  default: null  
},
favourites:{type:String,
  default: null  
},
suggested_for_you:{type:String,
  default: null  
},
upcoming_movies:{type:String,
  default: null  
},
///
created_at:{
    type: Date,
    immutable: true,
    default: () => Date.now(),
   },
updated_at:{
    type: Date,
    default: () => Date.now(),
   },
})

module.exports = mongoose.model('language', LanguageSchema)