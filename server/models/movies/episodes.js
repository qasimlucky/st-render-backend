const mongoose = require('mongoose');

const EpisodesSchema = new mongoose.Schema({
    
id:{
    type:Number
},
  season_id: {
    type: String,
    required: true,
  },
  title: {type: String,
    default: null
  },
  description: {type: String,
    default: null
  },
  thumbnail: {type: String,
    default: null
  },
  banner: {type: String,
    default: null},

    trailer: {type: String,
      default: null
    },
    video: {type: String,
      default: null
    },
    release_year: {type: String,
      default: null
    },
    cast: {type: String,
      default: null
    },
    genres: {type: String,
      default: 12345
    },
    type: {type: String
    },
    category:{
        type: String
    },
    quality:{
      type:String  
    },
    tags:{
        type:String
    },

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

module.exports = mongoose.model('episodes', EpisodesSchema)