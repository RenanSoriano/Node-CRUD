import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Test1743794821971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Ações",
                columns: [
                    {
                        name: "name",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "valor",
                        type: "int",
                    },
                    {
                        name: "data",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Ações");
    }

}
