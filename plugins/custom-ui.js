// ui by febri ardi saputra

import Vue from 'vue'

import SelectTab from '@/components/base/SelectTab'
import LoadingScreen from '@/components/base/LoadingScreen'
import LoadingSkeleton from '@/components/base/LoadingSkeleton'

// input
import SearchField from '@/components/input/SearchField'
import CategoryField from '@/components/input/CategoryField'

// form
import UploadImage from '@/components/base/UploadImage'
import SearchLocation from '@/components/base/SearchLocation'

// custom-ui
Vue.component('f-select-tab', SelectTab)
Vue.component('f-loading-screen', LoadingScreen)
Vue.component('f-skeleton', LoadingSkeleton)

// input
Vue.component('SearchField', SearchField)
Vue.component('CategoryField', CategoryField)

// form
Vue.component('f-upload-image', UploadImage)
Vue.component('f-search-location', SearchLocation)
