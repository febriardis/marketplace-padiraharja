// ui by febri ardi saputra

import Vue from 'vue'

import SelectTab from '@/components/base/SelectTab'
import LoadingScreen from '@/components/base/LoadingScreen'
import LoadingSkeleton from '@/components/base/LoadingSkeleton'

// input
import SearchField from '@/components/input/SearchField'
import CategoryField from '@/components/input/CategoryField'
import SearchProvinceField from '@/components/input/SearchProvinceField'
import SearchCityField from '@/components/input/SearchCityField'
import SearchDistrictField from '@/components/input/SearchDistrictField'
import SearchVillageField from '@/components/input/SearchVillageField'

// form
import UploadImage from '@/components/base/UploadImage'

// custom-ui
Vue.component('f-select-tab', SelectTab)
Vue.component('f-loading-screen', LoadingScreen)
Vue.component('f-skeleton', LoadingSkeleton)

// input
Vue.component('SearchField', SearchField)
Vue.component('CategoryField', CategoryField)
Vue.component('SearchProvinceField', SearchProvinceField)
Vue.component('SearchCityField', SearchCityField)
Vue.component('SearchDistrictField', SearchDistrictField)
Vue.component('SearchVillageField', SearchVillageField)

// form
Vue.component('f-upload-image', UploadImage)
