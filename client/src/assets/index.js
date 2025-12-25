// Modern Lucide React Icons
import { 
  MessageCircle,
  User,
  Users,
  Search,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Phone,
  Video,
  MoreVertical,
  Trash2,
  Clock,
  Paperclip,
  Image as ImageIcon,
  Send,
  X,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  ArrowLeft,
  SwitchCamera,
  Download,
  Maximize2,
  File,
  Lock,
  Eye,
  EyeOff,
  Coffee
} from "lucide-react";

// Keep existing assets
import logo from "./svgs/logo.svg";
import profile from "./images/profile.png";
import profile2 from "./images/tempProfImg.avif";
import ringtone from "./audio/ringtone.mp3";

// Export modern icons with backward compatible names
export {
  // Chat icons
  MessageCircle as BsFillChatRightTextFill,
  
  // User icons
  User as LuUser,
  User as FaUser,
  Users as LuUsers,
  
  // Auth icons
  Lock as FaLock,
  Eye as IoMdEye,
  EyeOff as IoMdEyeOff,
  Coffee as BiCoffee,
  
  // Navigation icons
  MessageCircle as PiChats,
  Search as RiUserSearchLine,
  Search as BiSearch,
  
  // Theme icons
  Sun as PiSunLight,
  Moon as IoIosMoon,
  
  // Dropdown icons
  ChevronDown as RiArrowDropDownLine,
  ChevronUp as RiArrowDropUpLine,
  
  // Call icons
  Phone as IoCallOutline,
  Video as IoVideocamOutline,
  Video as FaVideo,
  VideoOff as FaVideoSlash,
  PhoneOff as MdCallEnd,
  
  // Action icons
  MoreVertical as BsThreeDotsVertical,
  MoreVertical as BsThreeDots,
  Trash2 as MdDeleteOutline,
  Send as IoMdSend,
  X as RxCross2,
  X as IoClose,
  ArrowLeft as MdArrowBackIos,
  
  // Message icons
  Clock as LuClock3,
  Paperclip as IoMdAttach,
  ImageIcon as FiImage,
  File as FaFile,
  
  // Media icons
  Mic as FaMicrophone,
  MicOff as BsMicMuteFill,
  SwitchCamera as MdFlipCameraAndroid,
  Download as PiDownloadSimpleBold,
  Maximize2 as ImEnlarge2,
  
  // Assets
  logo,
  profile,
  profile2,
  ringtone,
};
