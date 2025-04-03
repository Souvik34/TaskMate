import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
            
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        
    },

}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { 
            id: this._id,
            email: this.email,
            username: this.username
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        });
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { 
            id: this._id,
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_REFRESH_EXPIRY 
        });
}

export const User = mongoose.model("User", userSchema);