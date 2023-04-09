import { formatISO9075 } from "date-fns";
import myImage from '../pics/pic1.jpg';

export default function Off() {
    return (
        <div className="post">
      <div className="image">
      
                <img src={myImage} alt="skin care image" />
       
      </div>
      <div className="content">
        
        <h2>The Best Daily Skincare Routine, According to Dermatologists</h2>
        
        <p className="info">
          <a className="author">meryem</a>
          <time>{formatISO9075(new Date())}</time>
        </p>
        <p className="summary">Starting a proper skincare routine is no easy feat. The store aisles are daunting, the TikTok tips and tricks are conflicting and the skincare product reviews are endless. Not to mention that everyone has different skin types, formula preferences, schedules and lifestyles. While there is no one right way to take care of your skin, we spoke with top dermatologists (the pros who really know) to help you figure out where to start and what to keep in mind while building the best routine for your skin.</p>
      </div>
    </div>
    )
}
