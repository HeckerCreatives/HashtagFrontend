import { Banknote, Cable, ChartColumn, Cog, HandCoins, LayoutGrid, MessageCircleQuestion, Pickaxe, ShoppingCart, TicketCheck, Users, WalletMinimal, Waypoints , AlignEndHorizontal} from "lucide-react";
import { FaRobot } from "react-icons/fa";

export const user = [
    {name:'Dashboard', icon: <LayoutGrid width={15} height={15}/>, route:'/user/dashboard'},
    {name:'Network', icon: <Cable width={15} height={15}/>, route:'/user/network'},
    {name:'Payout', icon: <Banknote width={15} height={15}/>, route:'/user/payout'},
    {name:'Buy Hash Bot', icon: <ShoppingCart width={15} height={15}/>, route:'/user/buyhashbot'},
    {name:'My Hash Bot', icon: <FaRobot width={15} height={15}/>, route:'/user/myhashbot'},
    // {name:'FAQ', icon: <MessageCircleQuestion width={15} height={15}/>, route:'/user/faq'},
]

export const superadmin = [
    {name:'Dashboard', icon: <LayoutGrid width={15} height={15}/>, route:'/superadmin/dashboard'},
    {name:'Manage Account', icon: <Users width={15} height={15}/>, route:'/superadmin/manageaccount'},
    {name:'Sales', icon: <ChartColumn width={15} height={15}/>, route:'/superadmin/sales'},
    // {name:'Maintenance', icon: <Cable width={15} height={15}/>, route:'/superadmin/maintenance'},
    {name:'Deposit', icon: <HandCoins width={15} height={15}/>, route:'/superadmin/deposit'},
    {name:'Withdrawal', icon: <WalletMinimal width={15} height={15}/>, route:'/superadmin/withdrawal'},
    // {name:'Price Pool', icon: <AlignEndHorizontal width={15} height={15}/>, route:'/superadmin/prizepool'},
    {name:'Complan', icon: <FaRobot width={15} height={15}/>, route:'/superadmin/complan'},
    {name:'Master Key', icon: <TicketCheck width={15} height={15}/>, route:'/superadmin/masterkey'},
    {name:'Settings', icon: <Cog width={15} height={15}/>, route:'/superadmin/settings'},
]


export const admin = [
    {name:'Dashboard', icon: <LayoutGrid width={15} height={15}/>, route:'/admin/dashboard'},
    {name:'Manage Account', icon: <Users width={15} height={15}/>, route:'/admin/manageaccount'},
    {name:'Withdrawal', icon: <WalletMinimal width={15} height={15}/>, route:'/admin/withdrawal'},
    {name:'Settings', icon: <Cog width={15} height={15}/>, route:'/admin/settings'},
]
