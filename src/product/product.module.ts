import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"
import { SizeEntity } from "./size.entity"
import { ProductService } from "./product.service"
import { ProductController } from "./product.controller"
import { ProductEntity } from "./product.entity"

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), TypeOrmModule.forFeature([SizeEntity])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
