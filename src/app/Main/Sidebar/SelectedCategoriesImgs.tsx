import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../assets/hooks/redux';
import { TLocType } from '../../../assets/types/types';


const SelectedCategoriesImgs = () => {
    const {selectedLocations} = useAppSelector(state => state.locations);
    const [categoriesCount, setCategoriesCount] = useState({
        churches: 0, bridges: 0, park: 0, exhibition: 0, monument: 0
    });

    const getCount = (locTypes: TLocType[]) => {
        return selectedLocations.filter(loc => locTypes.includes(loc.location_type))?.length
    }

    useEffect(() => {
        if (selectedLocations.length) {            
            setCategoriesCount({
                churches: getCount(["религиозные объекты"]),
                bridges: getCount(["мосты"]),
                park: getCount(["сады и парки", "природные объекты"]),
                exhibition: getCount(["выставочные залы", "замки и крепости"]),
                monument: getCount(["памятники"]),
            })
        }
    }, [selectedLocations])

    return (
        <div className='additional-info-container selected-categories'>
            <SelectedCategoriesImg locType='bridges' count={categoriesCount.bridges} ><Bridge/></SelectedCategoriesImg>
            <SelectedCategoriesImg locType='exhibition' count={categoriesCount.exhibition} ><Exhibition/></SelectedCategoriesImg>
            <SelectedCategoriesImg locType='churches' count={categoriesCount.churches} ><Church/></SelectedCategoriesImg>
            <SelectedCategoriesImg locType='monument' count={categoriesCount.monument} ><Monument/></SelectedCategoriesImg>
            <SelectedCategoriesImg locType='park' count={categoriesCount.park} ><Park/></SelectedCategoriesImg>
        </div>
    );
};

export default SelectedCategoriesImgs;

interface Props {
    locType: string
    count: number
    children: React.ReactNode
}

const SelectedCategoriesImg: FC<Props> = ({locType, count, children}) => {
    return (
        count 
        ?
        (<div className={`mode-variant-container ${locType}`}>
            <div className='mode-img-container'>
                {children}
            </div>

            <div className='mode-time'>
                <span>{count}</span>
            </div>
        </div>)
        : null
    )
}

const Church = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.2008 19.8V30H5.80078V19.8" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M1.97266 22.3467L15.9993 14.6934L30.026 22.3467" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M7.06641 13.4134L15.9997 8.32007L24.9331 13.4134" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M9.62695 18.1733V11.96" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M22.373 18.1733V11.96" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M15.9998 22.3467C16.6752 22.3467 17.323 22.615 17.8006 23.0926C18.2781 23.5702 18.5465 24.2179 18.5465 24.8933V30H13.4531V24.8933C13.4531 24.2179 13.7214 23.5702 14.199 23.0926C14.6766 22.615 15.3244 22.3467 15.9998 22.3467Z" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M16 0.666748V8.32008" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
            <path d="M13.4531 3.21338H18.5465" stroke="#595959" stroke-width="3" stroke-miterlimit="10"/>
        </svg>

    )
}

const Bridge = () => {
    return (
        <svg width="32" height="19" viewBox="0 0 32 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.9562 4.37625C30.38 4.37625 29.9128 4.84344 29.9128 5.4197V5.95764C28.5735 5.05776 27.0469 4.29662 25.391 3.6938V2.30216C25.391 1.7259 24.9238 1.2587 24.3476 1.2587C23.7713 1.2587 23.3041 1.7259 23.3041 2.30216V3.03604C21.3228 2.50378 19.2076 2.18459 17.0433 2.10653V1.04345C17.0433 0.467194 16.5761 0 15.9998 0C15.4236 0 14.9564 0.467194 14.9564 1.04345V2.10653C12.7921 2.18459 10.6769 2.50385 8.69556 3.03604V2.30216C8.69556 1.7259 8.22836 1.2587 7.6521 1.2587C7.07585 1.2587 6.60865 1.7259 6.60865 2.30216V3.6938C4.95282 4.29662 3.42623 5.05776 2.0869 5.95764V5.4197C2.0869 4.84344 1.61971 4.37625 1.04345 4.37625C0.467194 4.37625 0 4.84344 0 5.4197C0 5.74914 0 16.4654 0 17.2392C0 17.6409 0.230628 18.0069 0.593071 18.1804C2.70847 19.1928 5.2352 19.0131 7.18747 17.7116C8.73749 16.6782 10.7408 16.6784 12.2907 17.7116C14.5438 19.2136 17.4556 19.214 19.7092 17.7116C21.2594 16.6782 23.2625 16.6783 24.8125 17.7116C26.7647 19.0131 29.2915 19.1928 31.4069 18.1804C31.7693 18.0069 32 17.6409 32 17.2392C32 16.8527 32 6.83553 32 5.4197C31.9998 4.84344 31.5326 4.37625 30.9562 4.37625ZM17.0432 4.19399C19.2271 4.27793 21.348 4.62481 23.3041 5.19857V7.4201C21.3654 6.76578 19.2408 6.37734 17.0432 6.28359V4.19399ZM8.69543 5.19857C10.6514 4.62481 12.7724 4.27793 14.9563 4.19399V6.28365C12.7587 6.37734 10.634 6.76578 8.69543 7.42016V5.19857ZM2.08672 8.55555C3.35461 7.50485 4.89069 6.6174 6.60847 5.92196V8.2628C6.02864 8.53855 5.47232 8.84056 4.94463 9.169C3.80305 9.87945 2.84629 10.6786 2.08678 11.5429L2.08672 8.55555ZM18.5513 15.9752C17.0014 17.0085 14.9982 17.0085 13.4481 15.9752C12.3215 15.2241 11.0301 14.8486 9.73882 14.8486C9.72057 14.8486 9.70232 14.8494 9.68407 14.8496C11.232 13.2682 13.6993 12.5217 15.9997 12.5217C18.3173 12.5217 20.777 13.278 22.3153 14.8496C21.0058 14.8388 19.694 15.2135 18.5513 15.9752ZM25.9699 15.9752C25.7165 15.8063 25.4545 15.6575 25.1863 15.5265C24.3191 12.9797 20.7746 10.4347 15.9997 10.4347C11.2249 10.4347 7.68042 12.9797 6.81316 15.5265C6.54496 15.6575 6.28296 15.8063 6.02958 15.9752C4.86582 16.751 3.40523 16.9475 2.0894 16.533C2.15934 14.4699 3.55855 12.4898 6.04733 10.9408C8.69506 9.293 12.3226 8.34786 15.9997 8.34786C19.6767 8.34786 23.3043 9.293 25.952 10.9409C28.4407 12.4899 29.84 14.4699 29.91 16.533C28.5941 16.9474 27.1336 16.751 25.9699 15.9752ZM29.9128 11.5428C29.1533 10.6786 28.1964 9.87945 27.0549 9.169C26.5272 8.8405 25.9709 8.53855 25.3911 8.2628V5.92196C27.1089 6.6174 28.645 7.50479 29.9128 8.55555L29.9128 11.5428Z" fill="#595959"/>
        </svg>
    )
}

const Park = () => {
    return (
        <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9758 10.1393L22.8788 10.8621L23.3874 11.3848C24.2144 12.2349 24.7214 13.3877 24.7214 14.6617C24.7214 16.6669 23.4615 18.3802 21.6806 19.0549L21.0834 19.2812L20.8326 19.8685C20.4945 20.6599 20.1709 21.2018 19.6333 21.5619C19.1105 21.9122 18.1404 22.2466 16.1905 22.0313L14.5258 21.8474V23.5222L14.5258 30.5H12.6803V24.0041V21.6105L10.5262 22.6542C10.1626 22.8304 9.76338 22.929 9.34237 22.929C8.20406 22.929 7.22479 22.23 6.81617 21.23L6.52388 20.5147L5.77178 20.3374C3.32117 19.7597 1.5 17.5634 1.5 14.9432C1.5 13.0301 2.46706 11.3422 3.94563 10.3424L4.60538 9.89624V9.09981C4.60538 9.05654 4.60377 9.0203 4.60236 8.99546C4.60211 8.99116 4.60186 8.98694 4.6016 8.98289C4.62295 4.84596 7.98215 1.5 12.1236 1.5C14.2912 1.5 16.24 2.42151 17.6175 3.89726L17.99 4.29635L18.5319 4.36265C21.0676 4.67288 23.0297 6.83008 23.0297 9.445C23.0297 9.65879 23.0101 9.88416 22.9758 10.1393Z" stroke="#595959" stroke-width="3"/>
        </svg>
    )
}

const Exhibition = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.5" y="7.91064" width="26.9824" height="19.1609" stroke="#595959" stroke-width="3"/>
            <rect x="-1.5" y="1.5" width="15" height="7" transform="matrix(-1 0 0 1 22 12.5)" fill="#595959" stroke="#595959" stroke-width="3"/>
            <path d="M15.5628 2.5L19.5144 6.41101H11.6113L15.5628 2.5Z" fill="#595959"/>
        </svg>  
    )
}

const Monument = () => {
    return (
        <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6667 0C9.19271 0 8 1.19271 8 2.66667C8 4.14063 9.19271 5.33333 10.6667 5.33333C12.1406 5.33333 13.3333 4.14063 13.3333 2.66667C13.3333 1.19271 12.1406 0 10.6667 0ZM10.6667 5.33333H5.33333V8H7.29167L6.70833 21.3333H2.66667V29.3333H0V32H21.3333V29.3333H18.6667V21.3333H14.625L14.0417 8H16V5.33333H10.6667ZM9.95833 8H11.375L11.9583 21.3333H9.375L9.95833 8ZM5.33333 24H16V29.3333H5.33333V24Z" fill="#595959"/>
        </svg>
    )
}
