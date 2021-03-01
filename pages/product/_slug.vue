<template lang="pug">
    .product-detail.mt-3
        .row
            .col-md-5.col-sm-5
                img.w-100(src="https://via.placeholder.com/150")
            .col
                h3 Apple Airpods Gen 2 OEM 1:1 GPS Rename Wireless Charging
                h2 Rp. 134.500
            
                .product-detail
                    p.font-weight-bold.mt-0.mb-2 Informasi Produk
                    p.mt-0.mb-2 Kondisi: Baru
                    p.mt-0.mb-2 Berat: 99 Gram
                    p.mt-0.mb-2 Kategori: Earphone
                    p.mt-0.mb-2 Etalase: Semua Etalase
                    p.mt-0.mb-2 kita juga ready pouch / case nya di cek yaa :D

                    p.mt-0.mb-2 https://www.tokopedia.com/archive-ronny-acc/soft-case-silikon-pouch-airpods-pro-gen-2-spigen-pelindung-casing
                    p.mt-0.mb-2 Kita juga ready charger warless Airpods original

                    p.mt-0.mb-2 https://tokopedia.link/AyYCOHMxadb

                .product-detail.border-top.pt-2.mt-2
                    p.font-weight-bold.mt-0.mb-2 Informasi Penjual
                    .row
                        .col-md-6
                            .d-flex.align-items-center
                                .img-seller.mr-3
                                    img(src="https://via.placeholder.com/150" width="45" height="45")
                                .detail-seller
                                    h3.mt-0.mb-1 Olala Online Shop
                                    p.text-color-gray.text-size-small.m-0 Jakarta Selatan
                        .col.text-right
                            el-button(type="unique" size="small")
                              | Hubungi Penjual

                .web-action.border-top.mt-3
                    section.quantity-input
                        p.text-size-small.text-color-gray Kuantitas:
                        el-input-number(
                            size="medium"
                            :min="1" 
                            :max="10")
                    .row.mt-3
                        .col-md-4
                            el-button.w-100(type="cart")
                              | + Keranjang
                        .col-md-4
                            .show-on-mobile.mt-2
                            el-button.w-100(type="unique")
                              | Beli

        .action-card
        
    
</template>
