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
import Bang from "../audio/students/Bằng.mp3"
import Bao from "../audio/students/Bảo.mp3"
import Binh from "../audio/students/Bình.mp3"
import Chau from "../audio/students/Châu.mp3"
import Cuong from "../audio/students/Cường.mp3"
import Dang from "../audio/students/Đăng.mp3"
import Dat from "../audio/students/Đạt.mp3"
import Duc from "../audio/students/Đức.mp3"
import Ha from "../audio/students/Hà.mp3"
import Hai from "../audio/students/Hải.mp3"
import Hiep from "../audio/students/Hiệp.mp3"
import Hoang from "../audio/students/Hoàng.mp3"
import Hong from "../audio/students/Hồng.mp3"
import Hung from "../audio/students/Hùng.mp3"
import Huy from "../audio/students/Huy.mp3"
import Khanh from "../audio/students/Khánh.mp3"
import Khiem from "../audio/students/Khiêm.mp3"
import Khoa from "../audio/students/Khoa.mp3"
import Kiet from "../audio/students/Kiệt.mp3"
import Kien from "../audio/students/Kiên.mp3"
import Linh from "../audio/students/Linh.mp3"
import Loi from "../audio/students/Lợi.mp3"
import Long from "../audio/students/Long.mp3"
import Minh from "../audio/students/Minh.mp3"
import Nam from "../audio/students/Nam.mp3"
import Ngan from "../audio/students/Ngân.mp3"
import Nghi from "../audio/students/Nghi.mp3"
import Ngoc from "../audio/students/Ngọc.mp3"
import Nguyen from "../audio/students/Nguyên.mp3"
import Nghia from "../audio/students/Nghĩa.mp3"
import Nhan from "../audio/students/Nhân.mp3"
import Nhat from "../audio/students/Nhật.mp3"
import Phong from "../audio/students/Phong.mp3"
import Phuc from "../audio/students/Phúc.mp3"
import Phu from "../audio/students/Phú.mp3"
import Quan from "../audio/students/Quân.mp3"
import Sang from "../audio/students/Sang.mp3"
import Quyen from "../audio/students/Quyên.mp3"
import Quang from "../audio/students/Quang.mp3"
import Thanh from "../audio/students/Thanh.mp3"
import Thien from "../audio/students/Thiện.mp3"
import Thinh from "../audio/students/Thịnh.mp3"
import Tien from "../audio/students/Tiên.mp3"
import Tinh from "../audio/students/Tính.mp3"
import Tra from "../audio/students/Trà.mp3"
import Tri from "../audio/students/Trí.mp3"
import Truong from "../audio/students/Trường.mp3"
import Tung from "../audio/students/Tùng.mp3"
import Viet from "../audio/students/Việt.mp3"
import Vu from "../audio/students/Vũ.mp3"
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
        case "Bang":
            if (audio.paused) {
                audio.src = Bang;
                audio.play();
            }
            break;
        case "Bao":
            if (audio.paused) {
                audio.src = Bao;
                audio.play();
            }
            break;
        case "Binh":
            if (audio.paused) {
                audio.src = Binh;
                audio.play();
            }
            break;
        case "Chau":
            if (audio.paused) {
                audio.src = Chau;
                audio.play();
            }
            break;
        case "Cuong":
            if (audio.paused) {
                audio.src = Cuong;
                audio.play();
            }
            break;
        case "Dang":
            if (audio.paused) {
                audio.src = Dang;
                audio.play();
            }
            break;
        case "dat":
            if (audio.paused) {
                audio.src = Dat;
                audio.play();
            }
            break;
        case "Duc":
            if (audio.paused) {
                audio.src = Duc;
                audio.play();
            }
            break;
        case "Hai":
            if (audio.paused) {
                audio.src = Hai;
                audio.play();
            }
            break;
        case "Hoang":
            if (audio.paused) {
                audio.src = Hoang;
                audio.play();
            }
            break;
        case "Hiep":
            if (audio.paused) {
                audio.src = Hiep;
                audio.play();
            }
            break;
        case "Hong":
            if (audio.paused) {
                audio.src = Hong;
                audio.play();
            }
            break;
        case "Hung":
            if (audio.paused) {
                audio.src = Hung;
                audio.play();
            }
            break;
        case "Huy":
            if (audio.paused) {
                audio.src = Huy;
                audio.play();
            }
            break;
        case "Khanh":
            if (audio.paused) {
                audio.src = Khanh;
                audio.play();
            }
            break;
        case "Khiem":
            if (audio.paused) {
                audio.src = Khiem;
                audio.play();
            }
            break;
        case "Khoa":
            if (audio.paused) {
                audio.src = Khoa;
                audio.play();
            }
            break;
        case "Kiet":
            if (audio.paused) {
                audio.src = Kiet;
                audio.play();
            }
            break;
        case "Kien":
            if (audio.paused) {
                audio.src = Kien;
                audio.play();
            }
            break;
        case "Linh":
            if (audio.paused) {
                audio.src = Linh;
                audio.play();
            }
            break;
        case "Loi":
            if (audio.paused) {
                audio.src = Loi;
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
        case "Ngan":
            if (audio.paused) {
                audio.src = Ngan;
                audio.play();
            }
            break;
        case "Nghi":
            if (audio.paused) {
                audio.src = Nghi;
                audio.play();
            }
            break;
        case "Ngoc":
            if (audio.paused) {
                audio.src = Ngoc;
                audio.play();
            }
            break;
        case "Nghia":
            if (audio.paused) {
                audio.src = Nghia;
                audio.play();
            }
            break;
        case "Nguyen":
            if (audio.paused) {
                audio.src = Nguyen;
                audio.play();
            }
            break;
        case "Nhan":
            if (audio.paused) {
                audio.src = Nhan;
                audio.play();
            }
            break;
        case "Nhat":
            if (audio.paused) {
                audio.src = Nhat;
                audio.play();
            }
            break;
        case "Phong":
            if (audio.paused) {
                audio.src = Phong;
                audio.play();
            }
            break;
        case "Phuc":
            if (audio.paused) {
                audio.src = Phuc;
                audio.play();
            }
            break;
        case "Phu":
            if (audio.paused) {
                audio.src = Phu;
                audio.play();
            }
            break;
        case "Quan":
            if (audio.paused) {
                audio.src = Quan;
                audio.play();
            }
            break;
        case "Quyen":
            if (audio.paused) {
                audio.src = Quyen;
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
        case "Thien":
            if (audio.paused) {
                audio.src = Thien;
                audio.play();
            }
            break;
        case "Thinh":
            if (audio.paused) {
                audio.src = Thinh;
                audio.play();
            }
            break;
        case "Tien":
            if (audio.paused) {
                audio.src = Tien;
                audio.play();
            }
            break;
        case "Tinh":
            if (audio.paused) {
                audio.src = Tinh;
                audio.play();
            }
            break;
        case "Tra":
            if (audio.paused) {
                audio.src = Tra;
                audio.play();
            }
            break;
        case "Tri":
            if (audio.paused) {
                audio.src = Tri;
                audio.play();
            }
            break;
        case "Truong":
            if (audio.paused) {
                audio.src = Truong;
                audio.play();
            }
            break;
        case "Tung":
            if (audio.paused) {
                audio.src = Tung;
                audio.play();
            }
            break;
        case "Viet":
            if (audio.paused) {
                audio.src = Viet;
                audio.play();
            }
            break;
        case "Vu":
            if (audio.paused) {
                audio.src = Vu;
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