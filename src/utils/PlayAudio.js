import closer from "../audio/closer.mp3";
import thankyou from "../audio/thanks.mp3";
import edit from "../audio/edit.mp3";
import schedule from "../audio/schedule.mp3";
import one_morning from "../audio/one_morning.mp3";
import one_afternoon from "../audio/one_afternoon.mp3";
import save from "../audio/save.mp3";
import errorsave from "../audio/errorsave.mp3";
import makefriend from "../audio/makefriend.mp3";
import noschedule from "../audio/noschedule.mp3";
let audio = new Audio();
const PlayAudio = (type) => {
    switch (type) {
        case "thankyou":
            if (audio.paused) {
                audio.src = thankyou;
                audio.play();
            }
            break;
        case "noschedule":
            if (audio.paused) {
                audio.src = noschedule;
                audio.play();
            }
            break;
        case "closer":
            if (audio.paused) {
                audio.src = closer;
                audio.play();
            }
            break;
        case "makefriend":
            if (audio.paused) {
                audio.src = makefriend;
                audio.play();
            }
            break;
        case "save":
            if (audio.paused) {
                audio.src = save;
                audio.play();
            }
            break;
        case "errorsave":
            if (audio.paused) {
                audio.src = errorsave;
                audio.play();
            }
            break;
        case "edit":
            if (audio.paused) {
                audio.src = edit;
                audio.play();
            }
            break;
        case "schedule":
            if (audio.paused) {
                audio.src = schedule;
                audio.play();
            }
            break;
        case "one_morning":
            if (audio.paused) {
                audio.src = one_morning;
                audio.play();
            }
            break;
        case "one_afternoon":
            if (audio.paused) {
                audio.src = one_afternoon;
                audio.play();
            }
            break;
        default:
            break;
    }
};

export default PlayAudio;