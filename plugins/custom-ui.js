// ui by febri ardi saputra

import Vue from 'vue'

import SelectTab from '@/components/base/SelectTab'
import LoadingScreen from '@/components/base/LoadingScreen'
import LoadingSkeleton from '@/components/base/LoadingSkeleton'

// input
import SearchField from '@/components/input/SearchField'
import CategoryField from '@/components/input/CategoryField'
import UploadImageField from '@/components/input/UploadImageField'
import SelectCategoryField from '@/components/input/SelectCategoryField'
import SearchProvinceField from '@/components/input/SearchProvinceField'
import SearchCityField from '@/components/input/SearchCityField'
import SearchDistrictField from '@/components/input/SearchDistrictField'
import SearchVillageField from '@/components/input/SearchVillageField'

import SearchProvinceROField from '@/components/input/SearchProvinceROField'
import SearchCityROField from '@/components/input/SearchCityROField'
import SearchDistrictROField from '@/components/input/SearchDistrictROField'

// custom-ui
Vue.component('f-select-tab', SelectTab)
Vue.component('LoadingScreen', LoadingScreen)
Vue.component('f-skeleton', LoadingSkeleton)

// input
Vue.component('SearchField', SearchField)
Vue.component('CategoryField', CategoryField)
Vue.component('UploadImageField', UploadImageField)
Vue.component('SelectCategoryField', SelectCategoryField)
Vue.component('SearchProvinceField', SearchProvinceField)
Vue.component('SearchCityField', SearchCityField)
Vue.component('SearchDistrictField', SearchDistrictField)
Vue.component('SearchVillageField', SearchVillageField)

Vue.component('SearchProvinceROField', SearchProvinceROField)
Vue.component('SearchCityROField', SearchCityROField)
Vue.component('SearchDistrictROField', SearchDistrictROField)
