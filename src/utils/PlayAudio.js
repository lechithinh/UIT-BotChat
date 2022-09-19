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
import An from "../audio/students/An.mp3"
import Anh from "../audio/students/Anh.mp3"
import Bằng from "../audio/students/Bằng.mp3"
import Bảo from "../audio/students/Bảo.mp3"
import Bình from "../audio/students/Bình.mp3"
import Châu from "../audio/students/Châu.mp3"
import Cường from "../audio/students/Cường.mp3"
import Đăng from "../audio/students/Đăng.mp3"
import Đạt from "../audio/students/Đạt.mp3"
import Đức from "../audio/students/Đức.mp3"
import Hà from "../audio/students/Hà.mp3"
import Hải from "../audio/students/Hải.mp3"
import Hiep from "../audio/students/Hiệp.mp3"
import Hoàng from "../audio/students/Hoàng.mp3"
import Hồng from "../audio/students/Hồng.mp3"
import Hùng from "../audio/students/Hùng.mp3"
import Hưng from "../audio/students/Hưng.mp3"
import Huy from "../audio/students/Huy.mp3"
import Khánh from "../audio/students/Khánh.mp3"
import Khiêm from "../audio/students/Khiêm.mp3"
import Khoa from "../audio/students/Khoa.mp3"
import Kiệt from "../audio/students/Kiệt.mp3"
import Kiên from "../audio/students/Kiên.mp3"
import Linh from "../audio/students/Linh.mp3"
import Lợi from "../audio/students/Lợi.mp3"
import Long from "../audio/students/Long.mp3"
import Minh from "../audio/students/Minh.mp3"
import Nam from "../audio/students/Nam.mp3"
import Ngân from "../audio/students/Ngân.mp3"
import Nghi from "../audio/students/Nghi.mp3"
import Ngọc from "../audio/students/Ngọc.mp3"
import Nguyên from "../audio/students/Nguyên.mp3"
import Nghĩa from "../audio/students/Nghĩa.mp3"
import Nhân from "../audio/students/Nhân.mp3"
import Nhật from "../audio/students/Nhật.mp3"
import Phong from "../audio/students/Phong.mp3"
import Phúc from "../audio/students/Phúc.mp3"
import Phú from "../audio/students/Phú.mp3"
import Quân from "../audio/students/Quân.mp3"
import Sang from "../audio/students/Sang.mp3"
import Quyên from "../audio/students/Quyên.mp3"
import Quang from "../audio/students/Quang.mp3"
import Thanh from "../audio/students/Thanh.mp3"
import Thiện from "../audio/students/Thiện.mp3"
import Thịnh from "../audio/students/Thịnh.mp3"
import Tiên from "../audio/students/Tiên.mp3"
import Tính from "../audio/students/Tính.mp3"
import Trà from "../audio/students/Trà.mp3"
import Trí from "../audio/students/Trí.mp3"
import Trường from "../audio/students/Trường.mp3"
import Tùng from "../audio/students/Tùng.mp3"
import Việt from "../audio/students/Việt.mp3"
import Vũ from "../audio/students/Vũ.mp3"
import defaut from "../audio/students/defaut.mp3"
import OneClass from "../audio/students/OneClass.mp3"
import TwoClass from "../audio/students/TwoClass.mp3"
import ThreeClass from "../audio/students/ThreeClass.mp3"

let audio = new Audio();
const PlayAudio = (type) => {
    switch (type) {
        case "thankyou":
            if (audio.paused) {
                audio.src = thankyou;
                audio.play();
            }
            break;
        case "An":
            if (audio.paused) {
                audio.src = An;
                audio.play();
            }
            break;
        case "Anh":
            if (audio.paused) {
                audio.src = Anh;
                audio.play();
            }
            break;
        case "Bằng":
            if (audio.paused) {
                audio.src = Bằng;
                audio.play();
            }
            break;
        case "Bảo":
            if (audio.paused) {
                audio.src = Bảo;
                audio.play();
            }
            break;
        case "Bình":
            if (audio.paused) {
                audio.src = Bình;
                audio.play();
            }
            break;
        case "Châu":
            if (audio.paused) {
                audio.src = Châu;
                audio.play();
            }
            break;
        case "Cường":
            if (audio.paused) {
                audio.src = Cường;
                audio.play();
            }
            break;
        case "Đăng":
            if (audio.paused) {
                audio.src = Đăng;
                audio.play();
            }
            break;
        case "Đạt":
            if (audio.paused) {
                audio.src = Đạt;
                audio.play();
            }
            break;
        case "Đức":
            if (audio.paused) {
                audio.src = Đức;
                audio.play();
            }
            break;
        case "Hải":
            if (audio.paused) {
                audio.src = Hải;
                audio.play();
            }
            break;
        case "Hoàng":
            if (audio.paused) {
                audio.src = Hoàng;
                audio.play();
            }
            break;
        case "Hiep":
            if (audio.paused) {
                audio.src = Hiep;
                audio.play();
            }
            break;
        case "Hồng":
            if (audio.paused) {
                audio.src = Hồng;
                audio.play();
            }
            break;
        case "Hùng":
            if (audio.paused) {
                audio.src = Hùng;
                audio.play();
            }
            break;
        case "Hưng":
            if (audio.paused) {
                audio.src = Hưng;
                audio.play();
            }
            break;
        case "Huy":
            if (audio.paused) {
                audio.src = Huy;
                audio.play();
            }
            break;
        case "Khánh":
            if (audio.paused) {
                audio.src = Khánh;
                audio.play();
            }
            break;
        case "Khiêm":
            if (audio.paused) {
                audio.src = Khiêm;
                audio.play();
            }
            break;
        case "Khoa":
            if (audio.paused) {
                audio.src = Khoa;
                audio.play();
            }
            break;
        case "Kiệt":
            if (audio.paused) {
                audio.src = Kiệt;
                audio.play();
            }
            break;
        case "Kiên":
            if (audio.paused) {
                audio.src = Kiên;
                audio.play();
            }
            break;
        case "Linh":
            if (audio.paused) {
                audio.src = Linh;
                audio.play();
            }
            break;
        case "Lợi":
            if (audio.paused) {
                audio.src = Lợi;
                audio.play();
            }
            break;
        case "Long":
            if (audio.paused) {
                audio.src = Long;
                audio.play();
            }
            break;
        case "Minh":
            if (audio.paused) {
                audio.src = Minh;
                audio.play();
            }
            break;
        case "Nam":
            if (audio.paused) {
                audio.src = Nam;
                audio.play();
            }
            break;
        case "Ngân":
            if (audio.paused) {
                audio.src = Ngân;
                audio.play();
            }
            break;
        case "Nghi":
            if (audio.paused) {
                audio.src = Nghi;
                audio.play();
            }
            break;
        case "Ngọc":
            if (audio.paused) {
                audio.src = Ngọc;
                audio.play();
            }
            break;
        case "Nghĩa":
            if (audio.paused) {
                audio.src = Nghĩa;
                audio.play();
            }
            break;
        case "Nguyên":
            if (audio.paused) {
                audio.src = Nguyên;
                audio.play();
            }
            break;
        case "Nhân":
            if (audio.paused) {
                audio.src = Nhân;
                audio.play();
            }
            break;
        case "Nhật":
            if (audio.paused) {
                audio.src = Nhật;
                audio.play();
            }
            break;
        case "Phong":
            if (audio.paused) {
                audio.src = Phong;
                audio.play();
            }
            break;
        case "Phúc":
            if (audio.paused) {
                audio.src = Phúc;
                audio.play();
            }
            break;
        case "Phú":
            if (audio.paused) {
                audio.src = Phú;
                audio.play();
            }
            break;
        case "Quân":
            if (audio.paused) {
                audio.src = Quân;
                audio.play();
            }
            break;
        case "Quyên":
            if (audio.paused) {
                audio.src = Quyên;
                audio.play();
            }
            break;
        case "Sang":
            if (audio.paused) {
                audio.src = Sang;
                audio.play();
            }
            break;
        case "Thanh":
            if (audio.paused) {
                audio.src = Thanh;
                audio.play();
            }
            break;
        case "Thiện":
            if (audio.paused) {
                audio.src = Thiện;
                audio.play();
            }
            break;
        case "Thinh":
            if (audio.paused) {
                audio.src = Thịnh;
                audio.play();
            }
            break;
        case "Tiên":
            if (audio.paused) {
                audio.src = Tiên;
                audio.play();
            }
            break;
        case "Tính":
            if (audio.paused) {
                audio.src = Tính;
                audio.play();
            }
            break;
        case "Trà":
            if (audio.paused) {
                audio.src = Trà;
                audio.play();
            }
            break;
        case "Trí":
            if (audio.paused) {
                audio.src = Trí;
                audio.play();
            }
            break;
        case "Trường":
            if (audio.paused) {
                audio.src = Trường;
                audio.play();
            }
            break;
        case "Tùng":
            if (audio.paused) {
                audio.src = Tùng;
                audio.play();
            }
            break;
        case "Việt":
            if (audio.paused) {
                audio.src = Việt;
                audio.play();
            }
            break;
        case "Tùng":
            if (audio.paused) {
                audio.src = Tùng;
                audio.play();
            }
            break;
        case "Vũ":
            if (audio.paused) {
                audio.src = Vũ;
                audio.play();
            }
            break; 
        case "defaut":
            if (audio.paused) {
                audio.src = defaut;
                audio.play();
            }
            break;
        case "OneClass":
            if (audio.paused) {
                audio.src = OneClass;
                audio.play();
            }
            break;
        case "TwoClass":
            if (audio.paused) {
                audio.src = TwoClass;
                audio.play();
            }
            break;
        case "ThreeClass":
            if (audio.paused) {
                audio.src = ThreeClass;
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