# backend/alembic/versions/001_initial_migration.py

"""initial migration

Revision ID: 001
Revises: 
Create Date: 2023-05-14 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create WidgetA table
    op.create_table('widgets_a',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_widgets_a_id'), 'widgets_a', ['id'], unique=False)
    op.create_index(op.f('ix_widgets_a_name'), 'widgets_a', ['name'], unique=False)

    # Create WidgetB table
    op.create_table('widgets_b',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('widget_a_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['widget_a_id'], ['widgets_a.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_widgets_b_id'), 'widgets_b', ['id'], unique=False)
    op.create_index(op.f('ix_widgets_b_name'), 'widgets_b', ['name'], unique=False)

def downgrade():
    op.drop_table('widgets_b')
    op.drop_table('widgets_a')

# Instructions for modifying this migration script when breaking from the template:
# 1. Create a new migration file using 'alembic revision -m "description of changes"'
# 2. In the new migration file, implement the changes to your schema in both the
#    'upgrade()' and 'downgrade()' functions.
# 3. If you're adding a new table:
#    - Use op.create_table() in upgrade() and op.drop_table() in downgrade()
# 4. If you're modifying an existing table:
#    - Use op.add_column(), op.alter_column(), or op.drop_column() as needed
# 5. For other changes like adding constraints or indexes, use the appropriate
#    Alembic operations.
# 6. Always test your migrations by running them forwards and backwards to ensure
#    they work as expected.